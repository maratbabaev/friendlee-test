const range = document.querySelectorAll('.range input[type="range"]')
const num = document.querySelectorAll('.range input[type="text"]')
const sum = document.querySelectorAll('.input input[type="text"]')
const line = document.querySelectorAll('.range-line div')
const rangeRow = document.querySelectorAll('.range-row')
const btn = document.querySelector('.form-btn')

sumRes()

function sumRes() {
    sum[0].value = Math.round(+num[0].value.replace(/[^0-9]/g, '') / +num[2].value.replace(/[^0-9]/g, '') / 100 * 13 + +num[0].value.replace(/[^0-9]/g, '') + +num[1].value.replace(/[^0-9]/g, '')).toLocaleString() + ' ₽'
    sum[1].value = Math.round(+num[0].value.replace(/[^0-9]/g, '') / +num[2].value.replace(/[^0-9]/g, '') / 100 * 13).toLocaleString() + ' ₽'
}

function btnActive() {
    btn.classList.remove('not-active')
}


btn.addEventListener('click', (e) => {
    e.preventDefault()
    setTimeout(() => {
        btn.classList.add('pressed')
        btn.querySelector('span').innerHTML = 'Отправлено'
        document.querySelector('.main-form').classList.add('not-active')
        rangeRow.forEach(el => {
            el.classList.add('disabled')
        })
    }, 1000)
})


range.forEach((r, i) => {
    if (i === 0) {
        num[i].value = (+r.value).toLocaleString() + ' ₽'
        line[i].style.width = `${100 / 4000000 * +r.value}%`
    }
    if (i === 1) {
        num[i].value = (+r.value).toLocaleString() + ' ₽'
        line[i].style.width = `${100 / 1500000 * +r.value}%`
    }
    if (i === 2) {
        num[i].value = (+r.value).toLocaleString() + ' ₽'
        line[i].style.width = `${100 / 70 * +r.value}%`
    }
    r.addEventListener('change', () => {
        rangeRow[i].classList.add('disabled')
        btnActive()
        num[i].value = (+r.value).toLocaleString()
        sumRes()
        if (i === 0) {
            num[i].value = (+r.value).toLocaleString() + ' ₽'
            line[i].style.width = `${100 / 4000000 * +r.value}%`
        }
        if (i === 1) {
            num[i].value = (+r.value).toLocaleString() + ' ₽'
            line[i].style.width = `${100 / 1500000 * +r.value}%`
        }
        if (i === 2) {
            num[i].value = (+r.value).toLocaleString() + ' ₽'
            line[i].style.width = `${100 / 70 * +r.value}%`
        }
    })
})

num.forEach((n, i) => {
    n.addEventListener('input', () => {
        range[i].value = +n.value.replace(/[^0-9]/g, '')
        btnActive()
        if (i === 0) {
            line[i].style.width = `${100 / 4000000 * range[i].value}%`
        }
        if (i === 1) {
            line[i].style.width = `${100 / 1500000 * range[i].value}%`
        }
        if (i === 2) {
            line[i].style.width = `${100 / 70 * range[i].value}%`
        }
    })

    n.addEventListener('focus', () => {
        rangeRow.forEach(el => {
            el.classList.remove('active')
        })
        rangeRow[i].classList.add('active')
        rangeRow[i].classList.remove('disabled')
    })

    n.addEventListener('blur', () => {
        rangeRow[i].classList.add('disabled')
       
        n.value = (+n.value.replace(/[^0-9]/g, '')).toLocaleString()
        if (i === 0) {
            if (+n.value.replace(/[^0-9]/g, '') < 100000) {
                n.value = '100 000'
            }
            if (+n.value.replace(/[^0-9]/g, '') > 4000000) {
                n.value = '4 000 000'
            }
        }
        if (i === 1) {
            n.value = (+n.value.replace(/[^0-9]/g, '')).toLocaleString() + ' ₽'
            if (+n.value.replace(/[^0-9]/g, '') < 50000) {
                n.value = '50 000 ₽'
            }
            if (+n.value.replace(/[^0-9]/g, '') > 1500000) {
                n.value = '1 500 000 ₽'
            }
        }
        if (i === 2) {
            if (+n.value.replace(/[^0-9]/g, '') < 1) {
                n.value = '1'
            }
            if (+n.value.replace(/[^0-9]/g, '') > 70) {
                n.value = '70'
            }
        }
        sumRes()
    })
})









