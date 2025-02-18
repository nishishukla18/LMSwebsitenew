import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Sidebar() {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Course', path: '/educator/my-course', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon }
  ];

  return (
    isEducator && (
      <div className="md:w-64 w-16 border-r min-h-screen bg-gray-900 text-white flex flex-col p-4">
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === '/educator'}
            className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all"
          >
            <img src={item.icon} alt={item.name} className="w-6 h-6" />
            <p className="hidden md:block">{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
}

export default Sidebar;
