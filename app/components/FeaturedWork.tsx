import { motion } from 'framer-motion';
import { featuredWork } from '../data/content';

export const FeaturedWork = () => {
  return (
    <section className="min-h-screen py-32 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-24"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl text-gray-400 mb-2 tracking-widest">FEATURED WORK</h2>
          <p className="text-gray-600 tracking-wide">/ Recent explorations</p>
        </motion.div>

        <div className="space-y-32">
          {featuredWork.map((work, index) => (
            <motion.div
              key={work.id}
              className="group relative"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="mb-8">
                <span className="text-2xl font-light text-gray-600 mb-4 block">
                  {work.number}
                </span>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                  {work.title}
                </h3>
                <div className="flex gap-6 text-sm tracking-widest text-gray-400">
                  <span>{work.category}</span>
                  <span>{work.year}</span>
                </div>
              </div>

              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                {/* Text reveal panel (positioned behind image) */}
                <div className="absolute inset-0 bg-black/90 z-0 flex flex-col justify-center p-12 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <p className="text-white/80 text-xl leading-relaxed max-w-2xl">
                    {work.description}
                  </p>
                </div>

                <img
                  src={work.image}
                  alt={work.title}
                  className="relative w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-30 z-10"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};