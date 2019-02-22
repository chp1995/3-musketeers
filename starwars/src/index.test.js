const starWars = require('./index');
const starWarsNames = require('./starwars-names.json');

describe('starwars-names', () => {
  describe('all', () => {
    test('should be a fulfilled array', () => {
      expect(starWars.all).toHaveLength(starWarsNames.length)
    });
    test('should be an array of strings', () => {
      const result = true;
      for(x in starWars.all){
        if(typeof starWars.all[x]!='string'){
          result=false
        }
      }
      expect(result).toEqual(true)
    });

    test('should contain `Luke Skywalker`', () => {
      var result = false;
      for(x in starWars.all){
        if(starWars.all[x] == "Luke Skywalker"){
          result=true
        }
      }
      expect(result).toEqual(true)
    });

    test('should not contain `Ben Quadinaros`', () => {
      var result = true;
      for(x in starWars.all){
        if(starWars.all[x] == "Ben Quadinaros"){
          result=false
        }
      }
      expect(result).toEqual(true)
    });
  });

  describe('random', () => {
    test('should return a random item from the starWars.all', () => {
      // var result = true;
      // if(typeof starWars.random() == 'string'){
      //   result=false
      // }
      expect(typeof starWars.random()).toEqual('string')
    });

    test('should return an array of random items if passed a number', () => {
      // var result = true;
      var rdm = Math.floor((Math.random()*10)+1)
      // if(typeof starWars.random(rdm) == 'string'){
      //   result=false
      // }
      // expect(result).toEqual(true)
      expect(starWars.random(rdm).constructor).toEqual(Array)
    });
  });
});
