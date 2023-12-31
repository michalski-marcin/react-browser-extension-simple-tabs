import { RxCross2 } from 'react-icons/rx';
import { AnimatePresence, motion } from 'framer-motion';

function TabList({ mySites, deleteSite }) {
  return (
    <ul>
      <AnimatePresence mode='popLayout'>
        {mySites.map((site) => (
          <motion.li
            key={site.url}
            layout
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            onExitComplete={() => deleteSite(site.url)}>
            <div className='relative bg-[#F2F2F2] flex flex-row justify-between shadow-sm border-2 border-[#174873]  rounded-md p-3 mb-[10px] hover:bg-[#f8f8f8] hover:scale-[1.01] hover:shadow-lg transition duration-200'>
              <div>
                <a
                  target='_blank'
                  href={site.url}
                  className='font-bold text-[#BF2424] text-[13px]'>
                  {site.title}
                </a>
                <p className='text-[12px] text-[#022840]'>{site.comment}</p>
              </div>
              <div className='text-[#BF2424] text-xs'>
                <button onClick={() => deleteSite(site.url)}>
                  <RxCross2 className='hover:rotate-[90deg] hover:scale-[1.4] duration-200 linear' />
                </button>
              </div>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TabList;
