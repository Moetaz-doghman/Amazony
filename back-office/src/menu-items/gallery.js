// assets
import { AppstoreOutlined, AppstoreAddOutlined } from '@ant-design/icons';

// icons
const icons = {
  AppstoreOutlined,
  AppstoreAddOutlined
};
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const gallery = {
  id: 'group-gallery',
  title: 'Gallery',
  type: 'group',
  children: [
    {
      id: 'gallery-list',
      title: 'Gallery List',
      type: 'item',
      url: '/gallery-list',
      icon: icons.AppstoreOutlined
    },
    {
      id: 'gallery-add',
      title: 'Add Gallery',
      type: 'item',
      url: '/add-gallery',
      icon: icons.AppstoreAddOutlined
    }
  ]
};

export default gallery;
