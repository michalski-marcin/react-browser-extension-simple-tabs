import { RxCross2 } from "react-icons/rx";

function TabList({ mySites, deleteSite }) {
  return (
    <ul>
      {mySites.map((site, index) => (
        <li key={index}>
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
              <button onClick={() => deleteSite(index)}>
                <RxCross2 className='hover:rotate-[90deg] hover:scale-[1.4] duration-200 linear' />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TabList;
