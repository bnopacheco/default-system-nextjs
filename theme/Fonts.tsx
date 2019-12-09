import FontFaceObserver from 'fontfaceobserver';
import 'typeface-roboto';

export const initializeFonts = () => {
  const roboto = new FontFaceObserver('Roboto');

  roboto.load().then(() => {
    document.documentElement.classList.add('roboto');
  });
};
