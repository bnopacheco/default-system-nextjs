import FontFaceObserver from 'fontfaceobserver';
import 'typeface-roboto';

function loadFonts() {
    const font = new FontFaceObserver('Roboto');
    font.load().then(() => { console.log('Roboto has loaded'); });
}

export default loadFonts;
