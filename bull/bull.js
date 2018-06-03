(function () {
 var step = 1, // номер хода
 comp_step = null, //текущий код
 step_str = '', //текущий код в виде строки
 comp_num = null, // число компьютера
 comp_str = '', // число компьютера в виде строки
 res_bull = 0, // результат быки
 res_cow = 0, // результат коровы
 answers = [],// варианты решений
 msg = 'Число компьютера - ',
 msg1 = '\nВведите результат - ',
 user, comp, tr, res_comp, res_user;


 window.onload = function () {
 var set_number = $('#set_number'),
 user_num = $('#user_num');
 user = $('#user');
 comp = $('#comp');
 res_comp = $('td', comp);
 res_user = $('td', user);


 tr = $('tr', user)[0].cloneNode(true);
 $('#start_game').onclick = startGame;

 // фильтрация ввода чисел
 user_num.oninput = function () {
 this.value = this.value.replace(/\D/g, '');
 if (this.value.length > 4) this.value = this.value.slice(0, 4);
 if (this.value.length == 4) set_number.disabled = false;
 };
 // фильтрация повторяющихся чисел
 user_num.onkeypress = function (e) {
 e = e || window.event;
 var key = String.fromCharCode(e.keyCode || e.charCode);
 if (this.value.indexOf(key) !== -1) return false;
 };

 set_number.onclick = function () {
 var user_num = $('#user_num'),
 res = checkNumber(user_num.value),
 pos = (step - 1) * 3;
 if (pos > res_user.length - 1) {
 user.appendChild(tr.cloneNode(true));
 comp.appendChild(tr.cloneNode(true));
 res_comp = $('td', comp);
 res_user = $('td', user);
 }
 res_user[pos].innerHTML = user_num.value;
 res_user[pos + 1].innerHTML = res.bull;
 res_user[pos + 2].innerHTML = res.cow;
 if (res.bull == 4) {
 alert('Поздравляем с победой!\nЧисло загаданное компьютером - ' + user_num.value);
 return;
 }
 user_num.value = '';
 set_number.disabled = 'true';
 // Ход компьютера
 if (answers.length == 0) {
 return alert('Вы где-то ошиблись');
 }
 if (answers.length == 1) {
 return wonComp(answers[0].join(''));
 }
 comp_step = randAnswers();
 step_str = comp_step.join('');

 res_comp[pos].innerHTML = step_str;
 do {
 var res_bull = +prompt(msg + step_str + msg1 + 'быков', 0);
 } while (isNaN(res_bull));
 if (res_bull == 4) {
 return wonComp(step_str);
 }

 res_comp[pos + 1].innerHTML = res_bull;
 do {
 res_cow = +prompt(msg + step_str + msg1 + 'коров', 0);
 } while (isNaN(res_cow));
 res_comp[pos + 2].innerHTML = res_cow;

 if (res_cow + res_bull > 4) {
 return alert('Вы где-то ошиблись!\nНачните игру заново');
 }

 filterAnswers(comp_step, step_str, res_bull, res_cow);
 ++step;
 };
 startGame();
 };
 function wonComp(num) {
 alert('Победил компьютр!\nВаше число - ' + num);
 }

 // мини j :-)
 function $(name, element) {
 var el = (element || document).querySelectorAll(name);
 return el ? (el.length > 1 ? Array.apply(null, el) : el[0]) : [];
 }

 function startGame() {
 step = 1;
 // число компьютера
 answers = buildAnswers();
 comp_num = randNum();
 // оно же в виде строки
 comp_str = comp_num.join('');
 // очистили значения
 var allTd = $('table.tbl_result tbody td');
 for (var i = 0; i < allTd.length; i++) {
            allTd[i].innerHTML = '&nbsp;';
        }
    }

  
    var $tree;

    function randAnswers() {
        if (step == 1) return [1, 2, 3, 4];
        if (step == 2) return [5, 6, 7, 8];
        return answers[Math.round(Math.random() * (answers.length - 1))]
    }

    /*
     проверяем совпадение быков и коров числа компьютера
     с числом введенным пользователем
     */
    function checkNumber(num) {
        var bull = 0, cow = 0;
        num = num.split('');
        for (var i = 0; i < num.length; i++) {
            if (comp_num[i] == num[i]) {
                ++bull;
            } else {
                if (comp_str.indexOf(num[i]) !== -1) ++cow;
            }
        }
        return {bull: bull, cow: cow};
    }

    // все варианты 4-х значных чиел, удовл. условию
    function buildAnswers() {
        var all_res = [];
        for (var i = 1; i < 10; ++i) {
            for (var j = 0; j < 10; ++j) {
                if (j == i) continue;
                for (var k = 0; k < 10; ++k) {
                    if (k == j || k == i) continue;
                    for (var l = 0; l < 10; ++l) {
                        if (l == k || l == j || l == i) continue;
                        all_res.push([i, j, k, l]);
                    }
                }
            }
        }
        return all_res;
    }

    // фильтация вариантов решения
    function filterAnswers(num, num_str, bull, cow) {
        var tmp = [], tmp_bull, tmp_cow, this_num;
        t:for (var i = 0; i < answers.length; i++) {
            this_num = answers[i];
            if (this_num == num) continue t;
            if (cow == 0 && bull == 0) {
                for (var c = 0; c < 4; ++c) {
                    if (num_str.indexOf(this_num[c]) != -1) continue t;
                }
            }
            if (bull) {
                tmp_bull = 0;
                tmp_cow = 0;
                for (var a = 0; a < 4; ++a) {
                    if (this_num[a] == num[a]) {
                        ++tmp_bull;
                    }
                    if (cow) {
                        if (num_str.indexOf(this_num[a]) != -1) {
                            ++tmp_cow;
                        }
                    }
                }
                if (bull > tmp_bull)continue t;
                if (cow > tmp_cow)continue t;
            }
            if (bull == 0 && cow) {
                tmp_cow = 0;
                for (var b = 0; b < 4; ++b) {
                    if (this_num[b] == num[b]) continue t;
                    if (num_str.indexOf(this_num[b]) != -1) {
                        ++tmp_cow;
                    }
                }
                if (cow > tmp_cow)continue t;
            }
            tmp.push(this_num);
        }
        answers = tmp;
        tmp = [];
    }

    // генератор числа компьютера, можно и buildAnswers
    function randNum() {
        var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        nums.sort(function () {
            return Math.random() - 0.5
        });
        return nums[0] == 0 ? nums.slice(1, 5) : nums.slice(0, 4);
    }
}());