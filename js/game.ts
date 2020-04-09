import '../styles/styles.scss';


$(document).ready(function () {
    $(document).on('keydown', (event) => {
        if (event.keyCode == 32) {
            Wuerfel_werfen();
        }
    });

    $('#Wuerfel_werfen').on('click', () => {
        diceNumber++;
        Wuerfel_werfen();
        setActivePlayersName();
    });

    $('#Wuerfel_size_slider').on('change', Wuerfel_size_change);

    addPlayerInput();

    Wuerfel_size_change();
    Wuerfel_werfen();

    $('#new-player').on('click', addPlayerInput);
    $('#start-game').on('click', startGame);
    $('#reset-button').on('click', reset);

    $('#game').hide();
});

var Wuerfel_pageStyle = 0;
var Wuerfel_amount = 0;
var Wuerfel_zero = 1;
var Wuerfel_size = 100;
var Wuerfel_font_size = "40px";
var Wuerfel_point_size = "15px";
var Wuerfel_anzahlWuerfe = 6;
var Wuerfel_block = false;
var Wuerfel_alleine_werfen_block = [];
var Wuerfel_ersterWurf = true;
var players = [];
var diceNumber = 0;

const cubeDisabledClass = 'hidden-cube';

function Wuerfel_createPoints(value) {
    var Wuerfel_Wuerfel_table = document.createElement('table');

    var Wuerfel_Wuerfel_table_tr1 = document.createElement('tr');
    var Wuerfel_Wuerfel_table_tr2 = document.createElement('tr');
    var Wuerfel_Wuerfel_table_tr3 = document.createElement('tr');

    var Wuerfel_Wuerfel_table_tr1_td1 = document.createElement('td');
    var Wuerfel_Wuerfel_table_tr1_td2 = document.createElement('td');
    var Wuerfel_Wuerfel_table_tr1_td3 = document.createElement('td');
    var Wuerfel_Wuerfel_table_tr2_td1 = document.createElement('td');
    var Wuerfel_Wuerfel_table_tr2_td2 = document.createElement('td');
    var Wuerfel_Wuerfel_table_tr2_td3 = document.createElement('td');
    var Wuerfel_Wuerfel_table_tr3_td1 = document.createElement('td');
    var Wuerfel_Wuerfel_table_tr3_td2 = document.createElement('td');
    var Wuerfel_Wuerfel_table_tr3_td3 = document.createElement('td');

    switch (value) {
        case 0:
            break;
        case 1:
            Wuerfel_Wuerfel_table_tr2_td2.appendChild(document.createElement('div'));
            break;
        case 2:
            Wuerfel_Wuerfel_table_tr1_td1.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr3_td3.appendChild(document.createElement('div'));
            break;
        case 3:
            Wuerfel_Wuerfel_table_tr1_td1.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr2_td2.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr3_td3.appendChild(document.createElement('div'));
            break;
        case 4:
            Wuerfel_Wuerfel_table_tr1_td1.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr3_td1.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr1_td3.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr3_td3.appendChild(document.createElement('div'));
            break;
        case 5:
            Wuerfel_Wuerfel_table_tr1_td1.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr3_td1.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr2_td2.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr1_td3.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr3_td3.appendChild(document.createElement('div'));
            break;
        case 6:
            Wuerfel_Wuerfel_table_tr1_td1.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr2_td1.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr3_td1.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr1_td3.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr2_td3.appendChild(document.createElement('div'));
            Wuerfel_Wuerfel_table_tr3_td3.appendChild(document.createElement('div'));
            break;
    }

    Wuerfel_Wuerfel_table_tr1.appendChild(Wuerfel_Wuerfel_table_tr1_td1);
    Wuerfel_Wuerfel_table_tr1.appendChild(Wuerfel_Wuerfel_table_tr1_td2);
    Wuerfel_Wuerfel_table_tr1.appendChild(Wuerfel_Wuerfel_table_tr1_td3);
    Wuerfel_Wuerfel_table_tr2.appendChild(Wuerfel_Wuerfel_table_tr2_td1);
    Wuerfel_Wuerfel_table_tr2.appendChild(Wuerfel_Wuerfel_table_tr2_td2);
    Wuerfel_Wuerfel_table_tr2.appendChild(Wuerfel_Wuerfel_table_tr2_td3);
    Wuerfel_Wuerfel_table_tr3.appendChild(Wuerfel_Wuerfel_table_tr3_td1);
    Wuerfel_Wuerfel_table_tr3.appendChild(Wuerfel_Wuerfel_table_tr3_td2);
    Wuerfel_Wuerfel_table_tr3.appendChild(Wuerfel_Wuerfel_table_tr3_td3);

    Wuerfel_Wuerfel_table.appendChild(Wuerfel_Wuerfel_table_tr1);
    Wuerfel_Wuerfel_table.appendChild(Wuerfel_Wuerfel_table_tr2);
    Wuerfel_Wuerfel_table.appendChild(Wuerfel_Wuerfel_table_tr3);

    return Wuerfel_Wuerfel_table;
}

function Wuerfel_werfen() {
    $('#Wuerfel_verlauf_fenster').fadeOut(0);

    if (!Wuerfel_block) {
        Wuerfel_block = true;

        Wuerfel_pageStyle = +($('#Wuerfel_selectPageStyle').first().val());
        Wuerfel_amount = 6;

        if (Wuerfel_anzahlWuerfe == 0) {
            Wuerfel_amount = 4;
            $('#Wuerfel_selectAmount').first().val(4);
            Wuerfel_pageStyle = 6;
            $('#Wuerfel_selectPageStyle').first().val(6);
        }

        if ($('#Wuerfel_selectZero').first().val() == "true") {
            Wuerfel_zero = 0;
        }
        if ($('#Wuerfel_selectZero').first().val() == "false") {
            Wuerfel_zero = 1;
        }

        const randomNumbers = getRandomNumbers();
        var Wuerfel_wuerfelsWrap = document.getElementById('Wuerfel_wuerfelsWrap');

        var Wuerfel_wuerfelsInternWrap = document.createElement('div');
        Wuerfel_wuerfelsInternWrap.id = "Wuerfel_wuerfelsInternWrap";

        for (let i = 0; i < Wuerfel_amount; i++) {
            const isDisabled = isCubeDisabled(i);
            const Wuerfel_wuerfel = document.createElement('div');

            Wuerfel_wuerfel.classList.add('Wuerfel_wuerfel');
            if(isDisabled) {
                Wuerfel_wuerfel.classList.add(cubeDisabledClass);
            }

            Wuerfel_wuerfel.id = 'Wuerfel_Wuerfel_' + i;
            if(i < 4) {
                Wuerfel_wuerfel.title = "Klicke um den Würfel zu disablen/enablen";
            }

            var Wuerfel_Wuerfel_p = document.createElement('span');
            Wuerfel_Wuerfel_p.innerHTML = "" + randomNumbers[i];

            var Wuerfel_Wuerfel_table_abstand = document.createElement('div');
            Wuerfel_Wuerfel_table_abstand.id = "Wuerfel_Wuerfel_table_abstand";

            Wuerfel_wuerfel.appendChild(Wuerfel_Wuerfel_table_abstand);
            Wuerfel_wuerfel.appendChild(Wuerfel_createPoints(randomNumbers[i]));
            $(Wuerfel_wuerfel).on('click', () => toggleCube(i));

            Wuerfel_wuerfelsInternWrap.appendChild(Wuerfel_wuerfel);
        }

        disableButton();
        jQuery('#Wuerfel_wuerfelsWrap').animate({
            opacity: 0
        }, 400, function () {
            $('#Wuerfel_wuerfelsInternWrap').remove();
            Wuerfel_wuerfelsWrap.appendChild(Wuerfel_wuerfelsInternWrap);

            Wuerfel_size_change();
            jQuery('#Wuerfel_wuerfelsWrap').animate({
                opacity: 1
            }, 800, function () {
                Wuerfel_block = false;
                enableButton();
            });
        });
    }
}

function Wuerfel_size_change() {
    Wuerfel_size = +jQuery('#Wuerfel_size_slider').val();

    if (Wuerfel_size > 80) {
        Wuerfel_font_size = Wuerfel_size / 2 - 10 + 'px';
    } else {
        Wuerfel_font_size = Wuerfel_size / 2 + 5 + 'px';
    }

    Wuerfel_point_size = Wuerfel_size / 7 + 'px';

    jQuery('#Wuerfel_wuerfelsWrap .Wuerfel_wuerfel').css('width', Wuerfel_size + 'px');
    jQuery('#Wuerfel_wuerfelsWrap .Wuerfel_wuerfel').css('height', Wuerfel_size + 'px');
    jQuery('#Wuerfel_wuerfelsWrap .Wuerfel_wuerfel span').css('line-height', Wuerfel_size - 6 + 'px');
    jQuery('#Wuerfel_wuerfelsWrap .Wuerfel_wuerfel span').css('font-size', Wuerfel_font_size);

    jQuery('.Wuerfel_wuerfel table div').css('width', Wuerfel_point_size);
    jQuery('.Wuerfel_wuerfel table div').css('height', Wuerfel_point_size);
    jQuery('.Wuerfel_wuerfel table div').css('border-radius', Wuerfel_point_size);
}

const getRandomNumbers = (): number[] => {
    const result = [];
    for (let i = 0; i < Wuerfel_anzahlWuerfe; i++) {
        const randomNumber = Math.ceil(Math.random() * 6);
        result.push(randomNumber)
    }
    return result
}


const addPlayerInput = () => {
    const htmlString = `<div class="row justify-content-center">
        <div class="col-4">
          <div class="form-group">
            <input type="email" class="form-control user-input" placeholder="Max Mustermann">
          </div>
        </div>
      </div>`;

    let element = $.parseHTML(htmlString);
    $(element).on('keyup', (event) => {
        if (event.keyCode === 13) {
            addPlayerInput();
        }
    });

    $('.players-input').append(element)

    // @ts-ignore
    element[0].focus();
};

const startGame = () => {
    const newPlayers = [];
    // @ts-ignore
    document.querySelectorAll('.user-input').forEach((element: Element) => {
        const input = element as HTMLInputElement;
        newPlayers.push(input.value.trim());
        input.value = '';
    });

    $('#game').show();
    $('#players-input').hide();
    players = newPlayers.filter(Boolean);
    diceNumber = 0;
    setActivePlayersName();
};

const toggleCube = (index: number) => {
    if (index < 4) {
        const cube = $(`#Wuerfel_Wuerfel_${index}`);
        if (isCubeDisabled(index)) {
            cube.removeClass(cubeDisabledClass)
        } else {
            cube.addClass(cubeDisabledClass)

        }
    }
};

const setActivePlayersName = () => {
    const activePlayerElement: HTMLDivElement = document.getElementById('active-player') as HTMLDivElement;
    activePlayerElement.innerText = players[diceNumber % players.length]
};

const reset = () => {
    $('.players-input').empty();
    addPlayerInput();

    $('#players-input').show();
    $('#game').hide()
};

const disableButton = () => {
    $('#Wuerfel_werfen').prop('disabled', true);
};

const enableButton = () => {
    $('#Wuerfel_werfen').prop('disabled', false);
};


const isCubeDisabled = (cubeIndex: number): boolean => {
    const cube = $(`#Wuerfel_Wuerfel_${cubeIndex}`);
    return cube.hasClass(cubeDisabledClass)
}
