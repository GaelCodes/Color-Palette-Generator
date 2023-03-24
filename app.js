// Crear color palette generator
class ColorPaletteGenerator {


    static Init() {
        ColorPaletteGenerator.ColorInicial = 'linear-gradient(130.53deg, rgb(64, 64, 64) 17.47%, rgb(64, 64, 64) 27.71%, rgb(176, 176, 176) 27.72%, rgb(176, 176, 176) 36.75%, rgb(64, 64, 64) 36.76%, rgb(64, 64, 64) 45.49%, rgb(176, 176, 176) 45.5%, rgb(176, 176, 176) 54.23%, rgb(64, 64, 64) 54.24%, rgb(64, 64, 64) 63.27%, rgb(176, 176, 176) 63.27%, rgb(176, 176, 176) 71.71%, rgb(64, 64, 64) 71.71%)';
        ColorPaletteGenerator.DefaultColor = 'cyan';

        ColorPaletteGenerator.Color1 = document.getElementById('PaletteColor1');
        ColorPaletteGenerator.Color2 = document.getElementById('PaletteColor2');
        ColorPaletteGenerator.Color3 = document.getElementById('PaletteColor3');
        ColorPaletteGenerator.Color4 = document.getElementById('PaletteColor4');
        ColorPaletteGenerator.Color5 = document.getElementById('PaletteColor5');

        // Color picker
        ColorPaletteGenerator.PreviewColorScreen = document.getElementById('PreviewColorScreen');
        ColorPaletteGenerator.R = document.getElementById('PaletteR');
        ColorPaletteGenerator.G = document.getElementById('PaletteG');
        ColorPaletteGenerator.B = document.getElementById('PaletteB');

        ColorPaletteGenerator.Name = document.getElementById('name');
        ColorPaletteGenerator.SetInicialState();

        // Add events listeners
        ColorPaletteGenerator.Color1.addEventListener('click', ColorPaletteGenerator.ChangeSelectedButton);
        ColorPaletteGenerator.Color2.addEventListener('click', ColorPaletteGenerator.ChangeSelectedButton);
        ColorPaletteGenerator.Color3.addEventListener('click', ColorPaletteGenerator.ChangeSelectedButton);
        ColorPaletteGenerator.Color4.addEventListener('click', ColorPaletteGenerator.ChangeSelectedButton);
        ColorPaletteGenerator.Color5.addEventListener('click', ColorPaletteGenerator.ChangeSelectedButton);

        ColorPaletteGenerator.R.addEventListener('input', ColorPaletteGenerator.UpdateButtonColor);
        ColorPaletteGenerator.G.addEventListener('input', ColorPaletteGenerator.UpdateButtonColor);
        ColorPaletteGenerator.B.addEventListener('input', ColorPaletteGenerator.UpdateButtonColor);

        ColorPaletteGenerator.AddBtn = document.getElementById('addPaletteBtn');
        ColorPaletteGenerator.AddBtn.addEventListener('click', ColorPaletteGenerator.SaveColorPalette);

        ColorPaletteGenerator.RenderSavedPalettes();
    }

    static SetInicialState() {
        ColorPaletteGenerator.Color1.style.background = ColorPaletteGenerator.ColorInicial;
        ColorPaletteGenerator.Color2.style.background = ColorPaletteGenerator.ColorInicial;
        ColorPaletteGenerator.Color3.style.background = ColorPaletteGenerator.ColorInicial;
        ColorPaletteGenerator.Color4.style.background = ColorPaletteGenerator.ColorInicial;
        ColorPaletteGenerator.Color5.style.background = ColorPaletteGenerator.ColorInicial;

        if (ColorPaletteGenerator.SelectedColor == null) {
            ColorPaletteGenerator.SelectedColor = ColorPaletteGenerator.Color3;
        }
        ColorPaletteGenerator.Color3.dispatchEvent(new Event('click'));
        ColorPaletteGenerator.Name.value = '';
    }

    static SetPaletteState(savedPalette) {
        ColorPaletteGenerator.Color1.style.background = savedPalette.colors.Color1;
        ColorPaletteGenerator.Color2.style.background = savedPalette.colors.Color2;
        ColorPaletteGenerator.Color3.style.background = savedPalette.colors.Color3;
        ColorPaletteGenerator.Color4.style.background = savedPalette.colors.Color4;
        ColorPaletteGenerator.Color5.style.background = savedPalette.colors.Color5;
        ColorPaletteGenerator.Name.value = savedPalette.name;
    }

    static ChangeSelectedButton(event) {
        ColorPaletteGenerator.SelectedColor.classList.remove('selected');

        ColorPaletteGenerator.SelectedColor = event.target;
        ColorPaletteGenerator.SelectedColor.classList.add('selected');

        let bgColor = ColorPaletteGenerator.SelectedColor.style.background;
        if (bgColor == ColorPaletteGenerator.ColorInicial) {
            ColorPaletteGenerator.SelectedColor.style.background = ColorPaletteGenerator.DefaultColor;
        }
    }

    static UpdateButtonColor() {
        const R = ColorPaletteGenerator.R.value;
        const G = ColorPaletteGenerator.G.value;
        const B = ColorPaletteGenerator.B.value;

        // ColorPaletteGenerator.SelectedColor.
        ColorPaletteGenerator.PreviewColorScreen.style.background = `rgb(${R},${G},${B})`;
        ColorPaletteGenerator.SelectedColor.style.background = `rgb(${R},${G},${B})`;
    }

    static UpdatePreviewColor() {

    }

    static SaveColorPalette() {
        // Add to localStorage
        const paletteName = ColorPaletteGenerator.Name.value;

        if (paletteName == '') {
            alert('Debes indicar un nombre para la paleta de colores.');
            return;
        }

        const Palette = {
            name: paletteName,
            colors: {
                Color1: ColorPaletteGenerator.Color1.style.background,
                Color2: ColorPaletteGenerator.Color2.style.background,
                Color3: ColorPaletteGenerator.Color3.style.background,
                Color4: ColorPaletteGenerator.Color4.style.background,
                Color5: ColorPaletteGenerator.Color5.style.background
            },
        };

        let palettes = JSON.parse(localStorage.getItem('palettes'));
        if (!palettes) {
            palettes = [];
        }
        palettes.push(Palette);

        localStorage.setItem('palettes', JSON.stringify(palettes));

        // Add to DOM
        let savedPalette = new SavedPalette(Palette.name, Palette.colors);
        let savedPaletteView = new SavedPaletteView();
        let savedPaletteController = new SavedPaletteController(savedPalette, savedPaletteView);

        ColorPaletteGenerator.SetInicialState();
    }

    static RenderSavedPalettes() {
        // Get from localStorage
        let palettes = JSON.parse(localStorage.getItem('palettes'));
        if (!palettes) {
            palettes = [];
        }


        // Add to DOM
        for (let i = 0; i < palettes.length; i++) {
            const paletteData = palettes[i];

            let savedPalette = new SavedPalette(paletteData.name, paletteData.colors);
            let savedPaletteView = new SavedPaletteView();
            let savedPaletteController = new SavedPaletteController(savedPalette, savedPaletteView);
        }

    }
}

class SavedPalette {
    constructor(name, colors) {
        this.name = name;
        this.colors = colors
    }
}

class SavedPaletteView {
    constructor() {
        this.item = SavedPaletteView.SavedPalettePrototype.cloneNode(true);
        this.item.removeAttribute('id');

        this.paletteName = this.item.querySelector('.paletteName');
        this.deleteBtn = this.item.querySelector('.deleteBtn');

        this.paletteColor1 = this.item.querySelector('.palette-color1');
        this.paletteColor2 = this.item.querySelector('.palette-color2');
        this.paletteColor3 = this.item.querySelector('.palette-color3');
        this.paletteColor4 = this.item.querySelector('.palette-color4');
        this.paletteColor5 = this.item.querySelector('.palette-color5');
    }

    static Init() {
        console.log('Holisss');
        SavedPaletteView.SavedPalettePrototype = document.getElementById('SavedPalettePrototype');
        SavedPaletteView.SavedPalettesContainer = document.getElementById('SavedPalettesContainer');
    }

    populate(savedPalette) {
        console.log('palet data', savedPalette);
        this.paletteName.innerText = savedPalette.name;

        this.paletteColor1.style.background = savedPalette.colors.Color1;
        this.paletteColor2.style.background = savedPalette.colors.Color2;
        this.paletteColor3.style.background = savedPalette.colors.Color3;
        this.paletteColor4.style.background = savedPalette.colors.Color4;
        this.paletteColor5.style.background = savedPalette.colors.Color5;

        SavedPaletteView.SavedPalettesContainer.appendChild(this.item);
    }
}

class SavedPaletteController {
    constructor(savedPalette, savedPaletteView) {
        this.savedPalette = savedPalette;
        this.savedPaletteView = savedPaletteView;

        savedPaletteView.populate(savedPalette);

        savedPaletteView.deleteBtn.addEventListener('click', this.deletePalette.bind(this));
        savedPaletteView.item.addEventListener('click', this.selectPalette.bind(this));
    }

    deletePalette(event) {
        console.log('eventitoo', event);
        event.stopPropagation();

        // Delete from localStorage
        let palettes = JSON.parse(localStorage.getItem('palettes'));
        let index = palettes.findIndex((pal) => pal.name == this.savedPalette.name);
        palettes.splice(index, 1);

        localStorage.setItem('palettes', JSON.stringify(palettes));

        // Delete from DOM
        this.savedPalette = null;
        this.savedPaletteView.item.remove();
    }

    selectPalette() {
        ColorPaletteGenerator.SetPaletteState(this.savedPalette);
    }
}


window.addEventListener('load', () => {

    SavedPaletteView.Init();
    ColorPaletteGenerator.Init();
});