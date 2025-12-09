import { motion } from 'framer-motion';
import { capabilities } from '../data/content';

export const Capabilities = () => {
  return (
    <section className="min-h-screen py-20 md:py-32 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-16 md:mb-24"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl text-gray-400 mb-2 tracking-widest">CAPABILITIES</h2>
          <p className="text-gray-600 tracking-wide">/ What we bring to the table</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.id}
              className="relative"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <span className="text-2xl font-light text-gray-600 mb-6 block">
                {capability.number}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                {capability.title}
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};