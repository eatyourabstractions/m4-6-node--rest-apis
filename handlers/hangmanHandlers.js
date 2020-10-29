const { words } = require('../data/words');

// write your handlers here...

const getWordById = (req, res) =>{
    let id = req.params.id;
    let word = words.filter(c => c.id === id)
    
    if(word.length > 0){
      res.status(200).json({ status: 200, data: word[0] });
    } else{
      res.status(404).json({ status: 404, data: id });
    }
}

const getRandomWordInfo = (req, res) =>{
    const randWord = words[Math.floor(Math.random() * words.length)];
    res.status(200).json({status:200, id: randWord.id, letterCount: randWord.letterCount})
}

const getAllIndexes = (arr, val) =>{
    let indexes = [];
    for(let i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

const updateBooleans = (arr, word) =>{
    let myBools = word.split('').fill(false);
    for(const idx of arr){
        myBools[idx] = true
    }
    return myBools
}

const verifyGuess = (req, res) =>{
    let id = req.params.id;
    let letter = req.params.letter;
    let word = words.filter(c => c.id === id)
    if(word.length > 0){
        let palabra = word[0].word
        let indixes = getAllIndexes(palabra.split(''), letter)
        if(indixes.length > 0){
            let markedIndixes = updateBooleans(indixes, palabra)
            console.log(markedIndixes)
            res.status(200).json({status: 200, data: markedIndixes})
        } else {
            res.status(404).json({ status: 404, data: 'sorry keep guessing' });
        }
      } else{
        res.status(404).json({ status: 404, data: `theres no id: ${id}` });
      }

}
module.exports = {
    getWordById,
    getRandomWordInfo,
    verifyGuess,
  };