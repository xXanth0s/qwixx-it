import '../styles/styles.scss';
import {CubeData} from './models/cube-data.model';
import {Color} from './models/color.enum';


$(() => {
    $(document).on('keydown', (event) => {
        if (event.keyCode == 32) {
            Wuerfel_werfen();
        }
    });

    $('#Wuerfel_werfen').on('click', () => {
        Wuerfel_werfen();
    });

    revertButton().disabled = true;

    revertButton().onclick = () => {
        revert();
    };


    $('#Wuerfel_size_slider').on('change', Wuerfel_size_change);

    addPlayerInput();

    Wuerfel_size_change();
    Wuerfel_werfen();

    $('#new-player').on('click', addPlayerInput);
    $('#start-game').on('click', startGame);
    $('#reset-button').on('click', reset);

    $('#game').hide();
});

let Wuerfel_size = 100;
let Wuerfel_font_size = "40px";
let Wuerfel_point_size = "15px";
let players = [];
let diceNumber = 0;
let oldCubeData: CubeData[][] = [];

const colorOrder = [
    Color.RED,
    Color.ORANGE,
    Color.BLUE,
    Color.GREEN,
    Color.WHITE,
    Color.WHITE,
];

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

async function Wuerfel_werfen(): Promise<void> {

    diceNumber++;
    const cubeData = getNewCubeData();
    oldCubeData.push(cubeData);
    await drawCubes(cubeData);
    setActivePlayersName();
    revertButton().disabled = false;
}

function revert() {

    diceNumber--;
    oldCubeData.pop();
    revertButton().disabled = oldCubeData.length === 1;
    drawCubes(oldCubeData[oldCubeData.length - 1]);
    setActivePlayersName();
}

function drawCubes(cubeData: CubeData[]): Promise<void> {
    var Wuerfel_wuerfelsWrap = document.getElementById('Wuerfel_wuerfelsWrap');

    var Wuerfel_wuerfelsInternWrap = document.createElement('div');
    Wuerfel_wuerfelsInternWrap.id = "Wuerfel_wuerfelsInternWrap";

    for (let i = 0; i < cubeData.length; i++) {
        const cubeElement = createCubeElement(cubeData[i], i);
        Wuerfel_wuerfelsInternWrap.appendChild(cubeElement);
    }

    disableButton();
    return new Promise<void>(resolve => {
        jQuery('#Wuerfel_wuerfelsWrap').animate({
            opacity: 0
        }, 400, function () {
            $('#Wuerfel_wuerfelsInternWrap').remove();
            Wuerfel_wuerfelsWrap.appendChild(Wuerfel_wuerfelsInternWrap);

            Wuerfel_size_change();
            jQuery('#Wuerfel_wuerfelsWrap').animate({
                opacity: 1
            }, 800, function () {
                enableButton();
                resolve();
            });
        });
    })
}

function createCubeElement(cubeData: CubeData, index: number): HTMLDivElement {

    const id = `Wuerfel_Wuerfel_${index}`;
    const isDisabled = isCubeDisabled(index);

    const wuerfelElement = document.createElement('div');

    wuerfelElement.id = id;

    wuerfelElement.classList.add('Wuerfel_wuerfel');
    wuerfelElement.classList.add(cubeData.color);
    if (isDisabled) {
        wuerfelElement.classList.add(cubeDisabledClass);
    }

    if (cubeData.color !== Color.WHITE) {
        wuerfelElement.title = "Klicke um den Würfel zu disablen/enablen";
    }

    var Wuerfel_Wuerfel_p = document.createElement('span');
    Wuerfel_Wuerfel_p.innerHTML = "" + cubeData.value;

    var Wuerfel_Wuerfel_table_abstand = document.createElement('div');
    Wuerfel_Wuerfel_table_abstand.id = "Wuerfel_Wuerfel_table_abstand";

    wuerfelElement.appendChild(Wuerfel_Wuerfel_table_abstand);
    wuerfelElement.appendChild(Wuerfel_createPoints(cubeData.value));
    $(wuerfelElement).on('click', () => toggleCube(wuerfelElement));
    return wuerfelElement;
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

const getNewCubeData = (): CubeData[] => {
    return colorOrder.map(color => {
        const randomNumber = Math.ceil(Math.random() * 6);
        return {
            color: color,
            value: randomNumber
        }
    });
};


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

const toggleCube = (element: HTMLDivElement) => {
    if (element.classList.contains(cubeDisabledClass)) {
        element.classList.remove(cubeDisabledClass)
    } else {
        element.classList.add(cubeDisabledClass)
    }
};


const setActivePlayersName = () => {
    const activePlayerElement: HTMLDivElement = document.getElementById('active-player') as HTMLDivElement;

    activePlayerElement.innerText = players[diceNumber % players.length] || '';
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

const revertButton = (): HTMLButtonElement => {
    return document.getElementById('revert-button') as HTMLButtonElement;
}
