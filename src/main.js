const range = document.querySelectorAll('.range input[type="range"]')
const num = document.querySelectorAll('.range .range-input')
const sum = document.querySelectorAll('.input input[type="text"]')
const line = document.querySelectorAll('.range-line div')
const rangeRow = document.querySelectorAll('.range-row')
const btn = document.querySelector('.form-btn')
const proc = document.querySelector('.range-text__proc')
const form = document.querySelector('.main-form')

sumRes()

function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const value = Object.fromEntries(data.entries())
    form.classList.add('not-active')
    btn.classList.add('active')
    rangeRow.forEach(el => {
        el.classList.add('disabled')
    })

    setTimeout(() => {
        btn.classList.add('pressed')
        btn.querySelector('span').innerHTML = 'Отправлено'
        setTimeout(() => {
            alert(`Стоимость автомобиля: ${value.num1} ₽\r\nПервоначальный взнос: ${value.num2}\r\nСрок лизинга: ${value.num3}\r\nПроцент: ${value.procent}\r\nСумма договора лизинга: ${value.res1}\r\nЕжемесячный платеж от: ${value.res2}`)
            btn.classList.remove('pressed')
            btn.classList.remove('active')
            btn.querySelector('span').innerHTML = 'Оставить заявку'
            form.classList.remove('not-active')
            rangeRow.forEach(el => {
                el.classList.remove('disabled')
            })
        }, 300)
    }, 1000)
}


form.addEventListener('submit', handleSubmit);


function sumRes() {
    proc.value = Math.round(+num[0].value.replace(/[^0-9]/g, '') / 100 * +num[1].value.replace(/[^0-9]/g, '')).toLocaleString() + ' ₽'
    sum[1].value = Math.round((+num[0].value.replace(/[^0-9]/g, '') - +proc.value.replace(/[^0-9]/g, '')) * (0.05 * Math.pow((1 + 0.05), +num[2].value.replace(/[^0-9]/g, '')) / (Math.pow((1 + 0.05), +num[2].value.replace(/[^0-9]/g, '')) - 1))).toLocaleString() + ' ₽'
    sum[0].value = Math.round(+proc.value.replace(/[^0-9]/g, '') + +num[2].value.replace(/[^0-9]/g, '') * +sum[1].value.replace(/[^0-9]/g, '')).toLocaleString() + ' ₽'
}



function btnActive() {
    btn.classList.remove('not-active')
}






proc.addEventListener('input', () => {
    num[1].value = Math.round(100 / +num[0].value.replace(/[^0-9]/g, '') * +proc.value.replace(/[^0-9]/g, '')) + ' %'
    range[1].value = +num[1].value.replace(/[^0-9]/g, '')
    line[1].style.width = `${100 / 50 * (+range[1].value - 10)}%`
    btnActive()
})


proc.addEventListener('blur', () => {
    rangeRow[1].classList.add('disabled')
    proc.value = (+proc.value.replace(/[^0-9]/g, '')).toLocaleString() + ' ₽'
    if (+num[1].value.replace(/[^0-9]/g, '') < 10) {
        num[1].value = '10 %'
        proc.value = Math.round(+num[0].value.replace(/[^0-9]/g, '') * 0.1).toLocaleString() + ' ₽'
    }
    if (+num[1].value.replace(/[^0-9]/g, '') > 60) {
        num[1].value = '60 %'
        proc.value = Math.round(+num[0].value.replace(/[^0-9]/g, '') * 0.6).toLocaleString() + ' ₽'
    }
})


proc.addEventListener('focus', () => {
    rangeRow.forEach(el => {
        el.classList.remove('active')
    })
    rangeRow[1].classList.add('active')
    rangeRow[1].classList.remove('disabled')
})



range.forEach((r, i) => {
    if (i === 0) {
        num[i].value = (+r.value).toLocaleString()
        line[i].style.width = `${100 / 8500000 * (+r.value - 1500000)}%`
    }
    if (i === 1) {
        num[i].value = (+r.value).toLocaleString() + ' %'
        line[i].style.width = `${100 / 50 * (+r.value - 10)}%`
    }
    if (i === 2) {
        num[i].value = (+r.value).toLocaleString()
        line[i].style.width = `${100 / 114 * (+r.value - 6)}%`
    }
    r.addEventListener('input', () => {
        rangeRow[i].classList.add('disabled')
        btnActive()
        num[i].value = (+r.value).toLocaleString()
        sumRes()
        if (i === 0) {
            num[i].value = (+r.value).toLocaleString()
            line[i].style.width = `${100 / 8500000 * (+r.value - 1500000)}%`
        }
        if (i === 1) {
            num[i].value = (+r.value).toLocaleString() + ' %'
            line[i].style.width = `${100 / 50 * (+r.value - 10)}%`
        }
        if (i === 2) {
            num[i].value = (+r.value).toLocaleString()
            line[i].style.width = `${100 / 114 * (+r.value - 6)}%`
        }
    })
})

num.forEach((n, i) => {
    n.addEventListener('input', () => {
        range[i].value = +n.value.replace(/[^0-9]/g, '')
        btnActive()
        if (i === 0) {
            line[i].style.width = `${100 / 8500000 * (range[i].value - 1500000)}%`
        }
        if (i === 1) {
            n.value = +n.value.replace(/[^0-9]/g, '') + ' %'
            line[i].style.width = `${100 / 50 * (+range[i].value - 10)}%`
        }
        if (i === 2) {
            line[i].style.width = `${100 / 114 * (range[i].value - 6)}%`
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
            if (+n.value.replace(/[^0-9]/g, '') < 1500000) {
                n.value = '1 500 000'
            }
            if (+n.value.replace(/[^0-9]/g, '') > 10000000) {
                n.value = '10 000 000'
            }
        }
        if (i === 1) {
            n.value = (+n.value.replace(/[^0-9]/g, '')).toLocaleString() + ' %'
            if (+n.value.replace(/[^0-9]/g, '') < 10) {
                n.value = '10 %'
            }
            if (+n.value.replace(/[^0-9]/g, '') > 60) {
                n.value = '60 %'
            }
        }
        if (i === 2) {
            if (+n.value.replace(/[^0-9]/g, '') < 6) {
                n.value = '6'
            }
            if (+n.value.replace(/[^0-9]/g, '') > 120) {
                n.value = '120'
            }
        }
        sumRes()
    })
})









