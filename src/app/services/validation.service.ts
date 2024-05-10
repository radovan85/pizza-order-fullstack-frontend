import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateNumber(e: any) {
    var pattern = /^\d{0,4}(\.\d{0,4})?$/g;
    return pattern.test(e.key);
  }

  validateRegForm() {
    var firstName = (<HTMLInputElement>document.getElementById(`firstName`)).value;
    var lastName = (<HTMLInputElement>document.getElementById(`lastName`)).value;
    var email = (<HTMLInputElement>document.getElementById(`email`)).value;
    var password = (<HTMLInputElement>document.getElementById(`password`)).value;
    var confirmpass = (<HTMLInputElement>document.getElementById(`confirmpass`)).value;
    var address = (<HTMLInputElement>document.getElementById(`address`)).value;
    var city = (<HTMLInputElement>document.getElementById(`city`)).value;
    var postcode = (<HTMLInputElement>document.getElementById(`postcode`)).value;
    var phone = (<HTMLInputElement>document.getElementById(`phone`)).value;

    var firstNameError = document.getElementById(`firstNameError`);
    var lastNameError = document.getElementById(`lastNameError`);
    var emailError = document.getElementById(`emailError`);
    var passwordError = document.getElementById(`passwordError`);
    var addressError = document.getElementById(`addressError`);
    var cityError = document.getElementById(`cityError`);
    var postcodeError = document.getElementById(`postcodeError`);
    var phoneError = document.getElementById(`phoneError`);

    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    var returnValue = true;

    if (confirmpass !== password) {
      returnValue = false;
      alert(`Password does not match!`);
    } else {

      if (firstNameError) {
        if (firstName.trim() === `` || firstName.length > 30) {
          returnValue = false;
          firstNameError.style.visibility = `visible`;
        } else {
          firstNameError.style.visibility = `hidden`;
        }
      }

      if (lastNameError) {
        if (lastName.trim() === `` || lastName.length > 30) {
          returnValue = false;
          lastNameError.style.visibility = `visible`;
        } else {
          lastNameError.style.visibility = `hidden`;
        }
      }

      if (emailError) {
        if (email === `` || email.length > 50 || !regEmail.test(email)) {
          returnValue = false;
          emailError.style.visibility = `visible`;
        } else {
          emailError.style.visibility = `hidden`;
        }
      }

      if (passwordError) {
        if (password.trim().length < 6 || password.length > 30) {
          returnValue = false;
          passwordError.style.visibility = `visible`;
        } else {
          passwordError.style.visibility = `hidden`;
        }
      }

      if (addressError) {
        if (address.trim() === `` || address.length > 75) {
          returnValue = false;
          addressError.style.visibility = `visible`;
        } else {
          addressError.style.visibility = `hidden`;
        }
      }

      if (cityError) {
        if (city.trim() === `` || city.length > 40) {
          returnValue = false;
          cityError.style.visibility = `visible`;
        } else {
          cityError.style.visibility = `hidden`;
        }
      }

      if (postcodeError) {
        if (postcode.trim().length < 5 || postcode.length > 10) {
          returnValue = false;
          postcodeError.style.visibility = `visible`;
        } else {
          postcodeError.style.visibility = `hidden`;
        }
      }



      if (phoneError) {
        if (phone.length < 9 || phone.length > 15) {
          returnValue = false;
          phoneError.style.visibility = `visible`;
        } else {
          phoneError.style.visibility = `hidden`;
        }
      }

    }

    return returnValue;
  }

  validatePizza() {

    var imageUrl = (<HTMLInputElement>document.getElementById(`imageUrl`)).value;
    var name = (<HTMLInputElement>document.getElementById(`name`)).value;
    var description = (<HTMLInputElement>document.getElementById(`description`)).value;

    var imageUrlError = document.getElementById(`imageUrlError`);
    var nameError = document.getElementById(`nameError`);
    var descriptionError = document.getElementById(`descriptionError`);

    var returnValue = true;

    if (imageUrlError) {
      if (imageUrl.trim().length < 5 || imageUrl.length > 255) {
        returnValue = false;
        imageUrlError.style.visibility = `visible`;
      } else {
        imageUrlError.style.visibility = `hidden`;
      }
    }

    if (nameError) {
      if (name.trim() === `` || name.length > 40) {
        returnValue = false;
        nameError.style.visibility = `visible`;
      } else {
        nameError.style.visibility = `hidden`;
      }
    }

    if (descriptionError) {
      if (description.trim() === `` || description.length > 90) {
        returnValue = false;
        descriptionError.style.visibility = `visible`;
      } else {
        descriptionError.style.visibility = `hidden`;
      }
    }

    return returnValue;

  }


  validatePizzaSize() {

    var name = (<HTMLInputElement>document.getElementById(`name`)).value;
    var price = (<HTMLInputElement>document.getElementById(`price`)).value;
    var pizzaId = (<HTMLInputElement>document.getElementById(`pizzaId`)).value;

    var nameError = document.getElementById(`nameError`);
    var priceError = document.getElementById(`priceError`);
    var pizzaIdError = document.getElementById(`pizzaIdError`);

    var priceNumber = Number(price);
    var returnValue = true;

    if (nameError) {
      if (name.trim() === `` || name.length > 40) {
        returnValue = false;
        nameError.style.visibility = `visible`;
      } else {
        nameError.style.visibility = `hidden`;
      }
    }

    if (priceError) {
      if (price === `` || priceNumber <= 0) {
        returnValue = false;
        priceError.style.visibility = `visible`;
      } else {
        priceError.style.visibility = `hidden`;
      }
    }

    if (pizzaIdError) {
      if (pizzaId === ``) {
        returnValue = false;
        pizzaIdError.style.visibility = `visible`;
      } else {
        pizzaIdError.style.visibility = `hidden`;
      }
    }

    return returnValue;
  }

  validateCartItem() {
    var pizzaSizeId = (<HTMLSelectElement>document.getElementById(`pizzaSizeId`)).value;
    var quantity = (<HTMLInputElement>document.getElementById(`quantity`)).value;
    var pizzaSizeIdError = document.getElementById(`pizzaSizeIdError`);
    var quantityError = document.getElementById(`quantityError`);
    var quantityNumber = Number(quantity);
    var returnValue = true;

    if (pizzaSizeIdError) {
      if (pizzaSizeId === ``) {
        returnValue = false;
        pizzaSizeIdError.style.visibility = `visible`;
      } else {
        pizzaSizeIdError.style.visibility = `hidden`;
      }
    }

    if (quantityError) {
      if (quantity === `` || quantityNumber > 20) {
        returnValue = false;
        quantityError.style.visibility = `visible`;
      } else {
        quantityError.style.visibility = `hidden`;
      }
    }

    return returnValue;

  }


  validateShippingAddress() {
    var address = (<HTMLInputElement>document.getElementById(`address`)).value;
    var city = (<HTMLInputElement>document.getElementById(`city`)).value;
    var postcode = (<HTMLInputElement>document.getElementById(`postcode`)).value;

    var addressError = document.getElementById(`addressError`);
    var cityError = document.getElementById(`cityError`);
    var postcodeError = document.getElementById(`postcodeError`);

    var returnValue = true;

    if (addressError) {
      if (address.trim() === `` || address.length > 75) {
        returnValue = false;
        addressError.style.visibility = `visible`;
      } else {
        addressError.style.visibility = `hidden`;
      }
    }

    if (cityError) {
      if (city.trim() === `` || city.length > 40) {
        returnValue = false;
        cityError.style.visibility = `visible`;
      } else {
        cityError.style.visibility = `hidden`;
      }
    }

    if (postcodeError) {
      if (postcode.trim().length < 5 || postcode.length > 10) {
        returnValue = false;
        postcodeError.style.visibility = `visible`;
      } else {
        postcodeError.style.visibility = `hidden`;
      }
    }

    return returnValue;
  }

  validateCustomer() {
    var customerPhone = (<HTMLInputElement>document.getElementById(`customerPhone`)).value;
    var customerPhoneError = document.getElementById(`customerPhoneError`);
    var returnValue = true;

    if (customerPhoneError) {
      if (customerPhone.length < 9 || customerPhone.length > 15) {
        returnValue = false;
        customerPhoneError.style.visibility = `visible`;
      } else {
        customerPhoneError.style.visibility = `hidden`;
      }
    }

    return returnValue;
  }

}
