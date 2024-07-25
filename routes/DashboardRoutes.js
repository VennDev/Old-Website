import {v4 as uuid} from 'uuid';

/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 *    id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 *    badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
    {
        id: uuid(),
        title: 'Dashboard',
        icon: 'home',
        link: '/'
    },
    {
        id: uuid(),
        title: 'ACTIVITIES',
        grouptitle: true
    },
    // {
    //     id: uuid(),
    //     title: 'Nhân Viên',
    //     icon: 'layout',
    //     link: '/tables/nhanvien'
    // },
    // {
    //     id: uuid(),
    //     title: 'Chi Tiết Kiểm Kê',
    //     icon: 'layout',
    //     link: '/tables/chitietkiemke'
    // },
    {
        id: uuid(),
        title: 'Anime Defenders',
        icon: 'play-circle',
        link: '/tables/AnimeDefenders'
    },
    // {
    //     id: uuid(),
    //     title: 'Đơn Vị Sở Hữu',
    //     icon: 'layout',
    //     link: '/tables/donvisohuu'
    // },
    // {
    //     id: uuid(),
    //     title: 'Lịch Sử Kiểm Kê',
    //     icon: 'layout',
    //     link: '/tables/lichsukiemke'
    // },
    // // {
    // //     id: uuid(),
    // //     title: 'Người Dùng',
    // //     icon: 'layout',
    // //     link: '/tables/nguoidung'
    // // },
    // {
    //     id: uuid(),
    //     title: 'Tài Sản',
    //     icon: 'layout',
    //     link: '/tables/taisan'
    // },
    // {
    //     id: uuid(),
    //     title: 'Loại Tài Sản',
    //     icon: 'layout',
    //     link: '/tables/loaitaisan'
    // },
    // {
    //     id: uuid(),
    //     title: 'BÁO CÁO & TRA CỨU',
    //     grouptitle: true
    // },
    // {
    //     id: uuid(),
    //     title: 'Tra cứu thông tin',
    //     icon: 'layout',
    //     link: '/pages/tracuuthongtin'
    // },
];

export default DashboardMenu;
