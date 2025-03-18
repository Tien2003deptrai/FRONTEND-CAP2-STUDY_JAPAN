import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const Teacher = () => {
  const [groups, setGroups] = useState([
    {
      name: 'NewYork',
      status: 'Active',
      lead: {
        name: 'Letty Taylor',
        email: 'lettytaylor@gmail.com',
        avatar: '/api/placeholder/32/32',
      },
      region: 'NewYork',
      subRegion: 'West Bay',
      members: 4,
      showMenu: false,
    },
    {
      name: 'California',
      status: 'Inactive',
      lead: {
        name: 'Ian Chestnut',
        email: 'ian@gmail.com',
        avatar: '/api/placeholder/32/32',
      },
      region: 'Northeast',
      subRegion: 'Delaware',
      members: 4,
      showMenu: false,
    },
    {
      name: 'Newjersey',
      status: 'Active',
      lead: {
        name: 'Naveen Manoharan',
        email: 'Naveen@gmail.com',
        avatar: '/api/placeholder/32/32',
      },
      region: 'Midwest',
      subRegion: 'Maryland',
      members: 4,
      showMenu: false,
    },
    {
      name: 'Chicago',
      status: 'Active',
      lead: {
        name: 'Faith Martin',
        email: 'faith@gmail.com',
        avatar: '/api/placeholder/32/32',
      },
      region: 'South',
      subRegion: 'West Bay',
      members: 4,
      showMenu: false,
    },
    {
      name: 'Texas',
      status: 'Active',
      lead: {
        name: 'Alex Holland',
        email: 'alex@gmail.com',
        avatar: '/api/placeholder/32/32',
      },
      region: 'West',
      subRegion: 'West Bay',
      members: 4,
      showMenu: false,
    },
    {
      name: 'Washington',
      status: 'Active',
      lead: { name: 'Scp', email: 'scp', avatar: '/api/placeholder/32/32' },
      region: 'Massachusetts',
      subRegion: '',
      members: 4,
      showMenu: true,
    },
    {
      name: 'Virginia',
      status: 'Inactive',
      lead: {
        name: 'Tracy Akkam',
        email: 'tracya@gmail.com',
        avatar: '/api/placeholder/32/32',
      },
      region: 'Vermont',
      subRegion: 'West Virginia',
      members: 4,
      showMenu: false,
    },
    {
      name: 'Florida',
      status: 'Active',
      lead: {
        name: 'Faith Martin',
        email: 'faith@gmail.com',
        avatar: '/api/placeholder/32/32',
      },
      region: 'Illinois',
      subRegion: 'South Florida',
      members: 3,
      showMenu: false,
    },
    {
      name: 'Michigan',
      status: 'Inactive',
      lead: {
        name: 'Jacobs',
        email: 'jacobs@gmail.com',
        avatar: '/api/placeholder/32/32',
      },
      region: 'Missouri',
      subRegion: 'Louisiana',
      members: 4,
      showMenu: false,
    },
    {
      name: 'Colorado',
      status: 'Inactive',
      lead: {
        name: 'Ian Chestnut',
        email: 'ian@gmail.com',
        avatar: '/api/placeholder/32/32',
      },
      region: 'Iowa',
      subRegion: 'Arkansas',
      members: 3,
      showMenu: false,
    },
    {
      name: 'Alaska',
      status: 'Active',
      lead: {
        name: 'Shabi',
        email: 'shabi@gmail.com',
        avatar: '/api/placeholder/32/32',
      },
      region: 'Minnesota',
      subRegion: 'Alabama',
      members: 3,
      showMenu: false,
    },
    {
      name: 'Hawai',
      status: 'Inactive',
      lead: {
        name: 'Aleksa Martin',
        email: 'aleksa@gmail.com',
        avatar: '/api/placeholder/32/32',
      },
      region: 'Nebraska',
      subRegion: 'Mississippi',
      members: 4,
      showMenu: false,
    },
  ])

  const toggleMenu = (index) => {
    const updatedGroups = [...groups]
    updatedGroups[index].showMenu = !updatedGroups[index].showMenu
    setGroups(updatedGroups)
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h1 className="text-lg font-medium text-gray-800">Giáo viên</h1>
            <span className="ml-2 text-sm text-gray-500">200</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <AddIcon fontSize="small" className="mr-1" />
            Thêm Sinh Viên
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium text-gray-800">{group.name}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      group.status === 'Active'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-pink-100 text-pink-800'
                    }`}
                  >
                    {group.status === 'Active' ? '• Active' : '• Inactive'}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <img
                    src={group.lead.avatar}
                    alt={group.lead.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium">{group.lead.name}</p>
                    <p className="text-xs text-gray-500">{group.lead.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Region</p>
                    <p className="text-sm">{group.region}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Sub Region</p>
                    <p className="text-sm">{group.subRegion}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(3, group.members))].map((_, i) => (
                      <img
                        key={i}
                        src={`/api/placeholder/${24 + i}/${24 + i}`}
                        alt="Member"
                        className="w-6 h-6 rounded-full border border-white"
                      />
                    ))}
                    {group.members > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border border-white">
                        +{group.members - 3}
                      </div>
                    )}
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => toggleMenu(index)}
                  >
                    <MoreHorizIcon fontSize="small" />
                  </button>
                </div>
              </div>

              {group.showMenu && (
                <div className="border-t border-gray-100">
                  <div className="p-2 bg-blue-50">
                    <button className="w-full py-2 flex items-center text-sm text-blue-600 hover:bg-blue-100 rounded px-2">
                      <VisibilityIcon className="w-4 h-4 mr-2" />
                      View
                    </button>
                    <button className="w-full py-2 flex items-center text-sm text-gray-600 hover:bg-blue-100 rounded px-2">
                      <EditIcon className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button className="w-full py-2 flex items-center text-sm text-red-600 hover:bg-red-50 rounded px-2">
                      <DeleteIcon className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Teacher
