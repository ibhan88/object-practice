// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};



const pAequorFactory = (number, array) => {
  return {
    specimenNum: number,
    dna: array,
    mutate() {
      //randomly select base in dna property & change current base to different base
      //should return object's dna
      // ie. if current base is 'A', base must be changed to another base, cannot be 'A' again
      const chooseBase = Math.floor(Math.random() * 15);
      let currentBase = this.dna[chooseBase];
      //return random new base that is not current base
      let chooseNewBase = returnRandBase();
      while (chooseNewBase === currentBase) {
        chooseNewBase = returnRandBase();
      }
      //replace current base with new base
      this.dna[chooseBase] = chooseNewBase;
      return this.dna;
    },
    compareDNA(obj) {
      //compare current PA dna with passed in PA dna
      //compute how many bases are identical and in same locations
      //does not return anyting
      //prints a message stating percentage of dna in common
      //use specimen # to identify which PAs are being compared
      const currentDNA = this.dna;
      const comparisonDNA = obj.dna;
      let counterForSame = 0;
      for (let i = 0; i < currentDNA.length; i++) {
        if (currentDNA[i] === comparisonDNA[i]) {
          counterForSame++;
        }
      }
      //find percentage, rounded to two decimal places
      const percentage = parseFloat((counterForSame / 15 * 100).toFixed(2));
      //print statement
      console.log(`Specimen #${this['specimenNum']} and specimen #${obj['specimenNum']} have ${percentage}% DNA in common.`)
    },
    willLikelySurvive() {
      //return true if object's dna contains at least 60% 'c' or 'g' bases
      //return false if less than 60%
      const dnaArray = this.dna;
      let counter = 0;
      //loop through array to count how many matches
      dnaArray.forEach((base, i) => {
        if (dnaArray[i] === 'C' || dnaArray[i] === 'G') {
          counter++;
        }
      });
      //determine if at least 60% matching
      if ((counter / 15) > 0.6) {
        return true;
      } else {
        return false;
      }
    },
    complementStrand() {
      //returns complementary dna strand
      //'A' matches with 'T', and 'C' matches with 'G'
      let complementDNA = [];
      const currentDNA = this.dna;
      for (let i = 0; i < currentDNA.length; i++) {
        switch(currentDNA[i]) {
          case 'A':
            complementDNA.push('T');
            break;
          case 'T':
            complementDNA.push('A');
            break;
          case 'G':
            complementDNA.push('C');
            break;
          default:
            complementDNA.push('G');
            break;
        }
      }
      return complementDNA;
    }
  }
};



//Function to create array of 30 pAequor instances that will likely survive
const testArray = () => {
  let willSurviveList = [];
  let num = 1;
  while (willSurviveList.length < 30) {
    newPA = pAequorFactory(num, mockUpStrand());
    if (newPA.willLikelySurvive() === true) {
      num++;
      willSurviveList.push(newPA);
    }
  }
  return willSurviveList;
};



//TESTING
/*
//CREATE single new instance
const dnaStrand = mockUpStrand();
let newPA = pAequorFactory(12345, dnaStrand);
console.log('first PA: ' + newPA);

//FOR mutate method
newPA.mutate();
console.log(newPA);

//FOR compareDNA method
const dnaStrandTwo = mockUpStrand();
let newPATwo = pAequorFactory(56789, dnaStrandTwo);
console.log('second PA: ' + newPATwo);
newPA.compareDNA(newPATwo);

//FOR willLikelySurvive method
newPA.willLikelySurvive();

//FOR creating random test array of 30 instances
testArray();

//FOR complementStrand method
newPA.complementStrand();

*/
