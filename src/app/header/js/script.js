export function openNav(){
   let menu = document.getElementsByClassName('nav_items');
   console.log(menu);
   if (menu.length != 0){
      menu[0].style.display = 'block';
   }else{
      console.log("hi");
   }
}
export function closeNav(){
document.getElementsByClassName('nav_items').style.display = 'none';
};