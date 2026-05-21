export interface SidebarItem {
DisplayOrder :number,
IsActive : boolean
IsVisible : boolean
MenuIcon :string,
MenuId :string,
MenuName :string,
MenuType :string,
ParrentMenuId :string,
RouterLink :string,
SubMenu?: SidebarItem[];
SubMenus : string
}