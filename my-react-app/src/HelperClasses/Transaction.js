class Transaction {

    item_names = [];
    item_prices = [];
    item_amounts = [];
    item_ids = [];
    json;
    employee_name;
  
    constructor (_json) {
      this.clear_transaciton();
      this.json = _json;
      this.employee_name = "Shawn"
    }
  
    clear_transaciton() {
      this.item_names = [];
      this.item_prices = [];
      this.item_amounts = [];
      this.item_ids = [];
    }
  
    get_size() {
      return this.item_names.length;
    }

    set_employee_name(name) {
      this.employee_name = name;
    }
  
    add_to_transaciton(id) {
      let name = this.json[id]["name"];
      let cost = this.json[id]["cost"];
      let index = this.item_names.indexOf(name);
      if (index > -1) {
        // if the item is already on the order, it just increments the amount 
        this.item_amounts[index] += 1;
      }
      else {
        this.item_names.push(name);
        this.item_prices.push(cost);
        this.item_amounts.push(1);
        this.item_ids.push(id);
      }
    }
  
    get_total() {
      let sum = 0;
      for (var i = 0; i < this.item_prices.length; i++) {
        sum += (this.item_prices[i] * this.item_amounts[i]);
      }
      return sum;
    }
  
    to_string() {
      let output = "Current Order:\n"
      for (var i = 0; i < this.item_names.length; i++) {
        output += (this.item_names[i] + "  @ " + this.item_prices[i] + " x " + this.item_amounts[i] + "\n");
      }
      output += "Total = " + this.get_total();
      return output;
    }
  }

  export default Transaction;