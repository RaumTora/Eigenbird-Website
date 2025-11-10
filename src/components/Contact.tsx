import { motion } from 'framer-motion';
import { stats } from '../data/content';

export const Contact = () => {
  return (
    <section className="min-h-screen py-32 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl text-gray-400 mb-2 tracking-widest">LET'S TALK</h2>
            <p className="text-gray-600 tracking-wide mb-12">/ Get in touch</p>
            
            <a 
              href="mailto:hello@eigenbird.com"
              className="text-4xl md:text-5xl font-bold text-white hover:text-gray-300 transition-colors tracking-tight"
            >
              hello@eigenbird.com
            </a>

            <div className="mt-12 text-gray-400">
              <p className="mb-2 font-medium">Location</p>
              <p>San Francisco, CA</p>
            </div>

            <div className="mt-12 flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Dribbble</a>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">{stat.value}</h3>
                <p className="text-gray-400 text-sm tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};