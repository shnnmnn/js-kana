/**
 * Returns a random integer between min (inclusive) and max (exclusive)
 */
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getRandomPermutation (arr1, arr2, arr3) {
  length = arr1.length
  //assert(arr1.length == arr2.length)
  arr1 = arr1.slice(0)
  arr2 = arr2.slice(0)
  arr3 = arr3.slice(0)
  newarr1 = []
  newarr2 = []
  newarr3 = []
  for (let i = 0; i < length; i++) {
    let rnd = getRandomInt(0, length - i)
    newarr1.push(arr1[rnd])
    arr1.splice(rnd, 1)
    newarr2.push(arr2[rnd])
    arr2.splice(rnd, 1)
    newarr3.push(arr3[rnd])
    arr3.splice(rnd, 1)

  }
  return [newarr1, newarr2, newarr3]
}

window.onload = function () {
  fetch('data.json')
    .then(res => res.json())
    .then(table => {

      let katakana_array = []
      let hiragana_array = []
      let romaji_array = []

      for (let i in table) {
        katakana_array.push(table[i][0])
        hiragana_array.push(table[i][1])
        romaji_array.push(table[i][2])
      }

      kana_length = romaji_array.length


      done_indices = new Array()


      let kana = document.getElementById('kana')
      let input = document.getElementById('input')
      let sw = document.getElementById('switch')
      let newcircle = document.getElementById('newcircle')

      let ind, p_romaji, p_hira, p_kana, current_set_is_hira
      function reset () {
        ind = -1
        ;[p_romaji, p_hira, p_kana] = getRandomPermutation(romaji_array, hiragana_array, katakana_array)
      }
      reset()
      current_set_is_hira = true

      input.onkeyup = function (ev) {
        if (input.value == p_romaji[ind]) {
          donext()
        }
      }

      sw.onclick = function (ev) {
        current_set_is_hira = !current_set_is_hira
        kana.innerText = (current_set_is_hira ? p_hira : p_kana)[ind]

      }

      newcircle.onclick = function (ev) {
        reset()
        donext()
      }

      function donext() {
        ind++
        if (ind == kana_length) {
          ind = 0
          ;[p_romaji, p_hira] = getRandomPermutation(romaji_array, hiragana_array, katakana_array)
          alert('next circle')
        }
        input.value = ''
        kana.innerText = (current_set_is_hira ? p_hira : p_kana)[ind]
      }

      donext()
    })
    .catch(err => { throw err })

}
