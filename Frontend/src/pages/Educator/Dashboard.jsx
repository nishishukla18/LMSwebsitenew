import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Students/Loading';

function Dashboard() {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div>
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">
          
          {/* Total Enrollments Card */}
          <div className="flex items-center gap-3 shadow-card border p-4 rounded-lg">
            <img src={assets.appointments_icon} alt="Enrollments Icon" />
            <div>
              <p className="text-2xl">{dashboardData.enrolledStudentsData.length}</p>
              <p>Total Enrollments</p>
            </div>
          </div>

          {/* Total Earnings Card */}
          <div className="flex items-center gap-3 shadow-card border p-4 rounded-lg">
            <img src={assets.earning_icon} alt="Earnings Icon" />
            <div>
              <p className="text-2xl">{currency}{dashboardData.totalEarnings}</p>
              <p>Total Earnings</p>
            </div>
          </div>

        </div>

        {/* Latest Enrollments Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Latest Enrollments</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Course Name</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b last:border-none hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <img src={item.student.imageUrl} alt={item.student.name} className="w-10 h-10 rounded-full"/>
                      <span>{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Dashboard;
