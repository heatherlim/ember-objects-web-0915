import Ember from 'ember';

export default Ember.Object.extend({
  greet(){
    return `Hi, My name is ${this.firstName} ${this.lastName}. You can call me ${this.nickName}`;
  },

  isOld: Ember.computed("age", function(){
    if(this.get("age") > 30 ){
      return true;
    } else {
      return false;
    }
  }),

  wroteRuby: Ember.computed("authorOf", function(){
    if(this.get("authorOf") === "Ruby"){
      return true;
    } else {
      return false;
    }
  }),

  conferences: [],

  addConference: function(conf){
    this.conferences.push(conf);
    return this.conferences;
  },

  keyNoteConferences: Ember.computed("conferences.@each.keyNote", function(){
    var conferences = this.get('conferences');
    return conferences.filterBy('keyNote', `${this.firstName} ${this.lastName}`);

  }),

  conferenceNames: Ember.computed("conferences",function(){
    return this.conferences.map(function(item){
      return item.name;
    });
  }),

  conferenceTotal: Ember.computed("conferences",function(){
    var conferenceLength = this.conferences.length; 
    return conferenceLength;
  }),

  itinerary: Ember.computed("conferences",function(){
    var conferenceLength = this.conferences.length; 
    return `${this.nickName} is speaking at ${conferenceLength} conferences`;
  }),

  hasValidEmail: Ember.computed("email",function(){
    var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return re.test(this.email);
  }),

  isInvalid: Ember.computed("firstName","lastName","age","email",function(){
    if (!this.get("firstName") || !this.get("lastName") || !this.get("age") || !this.get("hasValidEmail") ){
      return true;
    }
      return false;
  }),

  errors: Ember.computed("firstName","lastName","age","email",function(){
    var array = [];
    if (!this.get("firstName")){
      array.push('firstName cannot be blank');
    }

    if (!this.get("lastName")){
      array.push('lastName cannot be blank');
    }
     if (!this.get("age")){
      array.push('age cannot be blank');
    }
    if (!this.get("email")){
      array.push('email must be valid');
    }
    return array;
  }),

  isValid: Ember.computed("isInvalid",function(){
   // if (!this.get("isInvalid")){
   //  return true;
   // } else {
   //  return false;
   // }
   return !this.get("isInvalid");
  }),

  hasErrors: Ember.computed("isInvalid",function(){
   if (this.get("isInvalid")){
    return true;
   }
   return false;
  }),

  

});

