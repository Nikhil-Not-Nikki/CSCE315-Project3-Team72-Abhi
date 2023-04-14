class Menu {

    burger_name_array = [];
    burger_id_array = [];
    burger_price_array = [];
    burger_materials_array = [];
  
    sandwich_name_array = [];
    sandwich_id_array = [];
    sandwich_price_array = [];
    sandwich_materials_array = [];
  
    extras_name_array = [];
    extras_id_array = [];
    extras_price_array = [];
    extras_materials_array = [];
  
    sweets_name_array = [];
    sweets_id_array = [];
    sweets_price_array = [];
    sweets_materials_array = [];
  
    basket_name_array = [];
    basket_id_array = [];
    basket_price_array = [];
    basket_materials_array = [];
    
  
    constructor(json) {
        for (const x in json) {
            if ((json[x]["type"] == "burger") && (!this.burger_name_array.includes(json[x]["name"]))){
              this.burger_name_array.push(json[x]["name"]);
              this.burger_id_array.push(json[x]["id"]);
              this.burger_price_array.push(json[x]["cost"]);
              this.burger_materials_array.push(json[x]["materials"]);
            }
            if ((json[x]["type"] == "sandwich") && (!this.sandwich_name_array.includes(json[x]["name"]))){
              this.sandwich_name_array.push(json[x]["name"]);
              this.sandwich_id_array.push(json[x]["id"]);
              this.sandwich_price_array.push(json[x]["cost"]);
              this.sandwich_materials_array.push(json[x]["materials"]);
            }
            if ((json[x]["type"] == "sweets") && (!this.sweets_name_array.includes(json[x]["name"]))){
              this.sweets_name_array.push(json[x]["name"]);
              this.sweets_id_array.push(json[x]["id"]);
              this.sweets_price_array.push(json[x]["cost"]);
              this.sweets_materials_array.push(json[x]["materials"]);
            }
            if ((json[x]["type"] == "extras") && (!this.extras_name_array.includes(json[x]["name"]))){
              this.extras_name_array.push(json[x]["name"]);
              this.extras_id_array.push(json[x]["id"]);
              this.extras_price_array.push(json[x]["cost"]);
              this.extras_materials_array.push(json[x]["materials"]);
            }
            if ((json[x]["type"] == "basket") && (!this.basket_name_array.includes(json[x]["name"]))){
              this.basket_name_array.push(json[x]["name"]);
              this.basket_id_array.push(json[x]["id"]);
              this.basket_price_array.push(json[x]["cost"]);
              this.basket_materials_array.push(json[x]["materials"]);
            }
        }
    }
  
    get_burger_name_array() {
      return this.burger_name_array;
    }
  
    get_extras_name_array() {
      return this.extras_name_array;
    }
  
    get_sweets_name_array() {
      return this.sweets_name_array;
    }
  
    get_sandwich_name_array() {
      return this.sandwich_name_array;
    }
  
    get_baskets_name_array() {
      return this.basket_name_array;
    }
  
    printMenu() {
      console.log("----------Burgers-----------");
      for (var i = 0; i < this.burger_name_array.length; i++) {
        console.log(this.burger_name_array[i])
      }
      console.log("---------Extras------------");
      for (var i = 0; i < this.extras_name_array.length; i++) {
        console.log(this.extras_name_array[i])
      }
      console.log("----------Sweets-----------");
      for (var i = 0; i < this.sweets_name_array.length; i++) {
        console.log(this.sweets_name_array[i])
      }
      console.log("----------Basket-----------");
      for (var i = 0; i < this.basket_name_array.length; i++) {
        console.log(this.basket_name_array[i])
      }
      console.log("-----------Sandwich----------");
      for (var i = 0; i < this.sandwich_name_array.length; i++) {
        console.log(this.sandwich_name_array[i])
      }
      console.log("---------------------");
    }
  }

  export default Menu;