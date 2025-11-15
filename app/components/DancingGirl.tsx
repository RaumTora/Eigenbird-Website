'use client'

import React, { useEffect, useRef, useState } from 'react'

export const DancingGirl = ({
  className = '',
  targetWidth = 720,
  targetHeight = 720,
}: {
  className?: string
  targetWidth?: number
  targetHeight?: number
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const mixerRef = useRef<any>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle')

  useEffect(() => {
    let renderer: any = null
    let scene: any = null
    let camera: any = null
    let mounted = true

    // The loadScript function is fine, but we'll try to use imports first
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if ((window as any).THREE && src.includes('three.min.js')) return resolve()
        const existing = Array.from(document.getElementsByTagName('script')).find(s => s.src === src)
        if (existing) return existing.addEventListener('load', () => resolve())
        const s = document.createElement('script')
        s.src = src
        s.async = true
        s.onload = () => resolve()
        s.onerror = () => reject(new Error('Failed to load ' + src))
        document.head.appendChild(s)
      })

    const init = async () => {
      try {
        let THREE: any = null
        let GLTFLoaderLocal: any = null
        // We don't need OrbitControls
        // let OrbitControlsLocal: any = null 

        try {
          const three = await import('three')
          const loaderMod = await import('three/examples/jsm/loaders/GLTFLoader')
          // const controlsMod = await import('three/examples/jsm/controls/OrbitControls')
          THREE = three
          GLTFLoaderLocal = loaderMod.GLTFLoader
          // OrbitControlsLocal = controlsMod.OrbitControls
          console.log('DancingGirl: using local three + jsm loaders')
        } catch (err) {
          console.warn('DancingGirl: dynamic import failed, falling back to CDN UMD', err)
          await loadScript('https://unpkg.com/three@0.158.0/build/three.min.js')
          await loadScript('https://unpkg.com/three@0.158.0/examples/js/loaders/GLTFLoader.js')
          // await loadScript('https://unpkg.com/three@0.158.0/examples/js/controls/OrbitControls.js')
          if (!mounted) return
          THREE = (window as any).THREE
          GLTFLoaderLocal =
            (window as any).GLTFLoader || (THREE as any).GLTFLoader
          // OrbitControlsLocal =
          //   (window as any).OrbitControls || (THREE as any).OrbitControls
        }

        if (!mounted) return

        const width = containerRef.current?.clientWidth || targetWidth
        const height = containerRef.current?.clientHeight || targetHeight

        renderer = new THREE.WebGLRenderer({ antiasias: true, alpha: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(width, height)
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.setClearColor(0x000000, 0)

        scene = new THREE.Scene()

        // --- 💡💡💡 THIS IS THE FIX 💡💡💡 ---
        // 1. Set a reasonable FOV (Field of View)
        // 2. Set the near plane to 0.1 so it doesn't clip
        camera = new THREE.PerspectiveCamera( 50, width / height, 0.1, 1000 );
        
        // 3. Set the camera position to be close to the model
        // (y=1 is eye-level, z=3.5 is the distance)
        camera.position.set( 0, 1.3, 3.5 );

        // 4. Look at the center of the model (which is at y=1)
        camera.lookAt( 0, 1.3, 0 );
        // --- End of Fix ---

        const ambient = new THREE.AmbientLight(0xffffff, 1.2)
        scene.add(ambient)

        const dir = new THREE.DirectionalLight(0xffffff, 1)
        dir.position.set(5, 10, 7)
        scene.add(dir)

        if (containerRef.current) {
          containerRef.current.appendChild(renderer.domElement)
          renderer.domElement.style.width = '100%'
          renderer.domElement.style.height = '100%'
          renderer.domElement.style.display = 'block'
          renderer.domElement.style.position = 'relative'
          containerRef.current.style.overflow = 'visible'
        }

        setStatus('loading')

        const loader = new GLTFLoaderLocal()
        loader.load(
          '/models/Michelle.glb',
          (gltf: any) => {
            console.log('DancingGirl: model loaded', gltf)
            setStatus('loaded')

            console.log(gltf.scene || gltf.scenes)
            const root = gltf.scene || gltf.scenes?.[0]
            if (!root) return

            root.traverse((c: any) => {
              if (c.isMesh) {
                c.castShadow = true
                c.receiveShadow = true
                if (c.material) c.material.needsUpdate = true
              }
            })

            // ----------------------------
            // FIXED SCALING + CENTERING
            // (This block is good, we keep it)
            // ----------------------------
            try {
              const box = new THREE.Box3().setFromObject(root)
              const size = new THREE.Vector3()
              box.getSize(size)

              const maxDim = Math.max(size.x, size.y, size.z)
              const scale = 0.75 / maxDim 
              root.scale.setScalar(scale)

              const scaledBox = new THREE.Box3().setFromObject(root)
              const center = new THREE.Vector3()
              scaledBox.getCenter(center)

              root.position.x -= center.x
              root.position.z -= center.z
              root.position.y -= scaledBox.min.y
            } catch (e) {
              // 💡 Added logging here in case this fails
              console.error("Failed to scale and center model", e)
            }

            scene.add(root)

            
            // The "FIXED CAMERA FRAMING" block that was here
            // is correctly removed.

            if (gltf.animations && gltf.animations.length) {
              const mixer = new THREE.AnimationMixer(root)
              mixer.clipAction(gltf.animations[0]).play()
              mixerRef.current = mixer
            }
          },
          undefined,
          (err: any) => {
            console.warn('Failed to load model', err)
            setStatus('error')
          }
        )
        
        // --- 💡💡💡 REMOVED ORBIT CONTROLS 💡💡💡 ---
        // They were all disabled and conflicting.
        /*
        const controls = new OrbitControlsLocal(camera, renderer.domElement)
        controls.enablePan = false
        controls.enableZoom = false
        controls.enableRotate = false
        controls.target.set(0, 1, 0)
        controls.update()
        ;(window as any)._dancingControls = controls
        */

        const onResize = () => {
          if (!containerRef.current) return
          const w = containerRef.current.clientWidth || targetWidth
          const h = containerRef.current.clientHeight || targetHeight
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          renderer.setSize(w, h)
        }

        window.addEventListener('resize', onResize)

        const animate = () => {
          if (!mounted) return
          if (mixerRef.current) mixerRef.current.update(0.009)
          renderer.render(scene, camera)
          rafRef.current = requestAnimationFrame(animate)
        }

        rafRef.current = requestAnimationFrame(animate)
      } catch (e) {
        console.warn('three.js load failed', e)
      }
    }

    init()

    return () => {
      mounted = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (renderer && renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: targetWidth,
        height: targetHeight,
        minHeight: targetHeight,
        display: 'block',
        position: 'relative',
        background: 'transparent',
      }}
    >
      {status !== 'loaded' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 14,
            background:
              status === 'loading'
                ? 'rgba(0,0,0,0.25)'
                : 'rgba(0,0,0,0.4)',
          }}
        >
          {/* {status === 'loading' && <div>Loading 3D model...</div>}
          {status === 'error' && <div>Failed to load model (check console)</div>}
          {status === 'idle' && <div>Preparing viewer...</div>} */}
        </div>
      )}
    </div>
  )
}

export default DancingGirl