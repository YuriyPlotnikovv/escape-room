import {
  DEFAULT_BG_IMAGE,
  DEFAULT_BG_IMAGE_2X,
  DEFAULT_BG_WEBP,
  DEFAULT_BG_WEBP_2X,
  DEFAULT_BG_HEIGHT,
} from '../../const/const';

type PageDecorProps = {
  image?: string;
  image2x?: string;
  webp?: string;
  webp2x?: string;
  height?: string;
}

function PageDecor({image, image2x, webp, webp2x, height}: PageDecorProps): JSX.Element {
  const hasAllCustom =
    image && image2x && webp && webp2x;

  const hasOnlyBasic =
    image && webp && !image2x && !webp2x;

  let imgSrc: string | undefined;
  let imgSrcSet: undefined | string;
  let webpSrcSet: string | undefined;

  if (hasAllCustom) {
    imgSrc = image;
  } else {
    imgSrc = hasOnlyBasic
      ? image
      : DEFAULT_BG_IMAGE;
  }

  if (hasAllCustom) {
    imgSrcSet = `${image}, ${image2x} 2x`;
  } else {
    imgSrcSet = hasOnlyBasic
      ? undefined
      : `${DEFAULT_BG_IMAGE}, ${DEFAULT_BG_IMAGE_2X} 2x`;
  }

  if (hasAllCustom) {
    webpSrcSet = `${webp}, ${webp2x} 2x`;
  } else {
    webpSrcSet = hasOnlyBasic
      ? webp
      : `${DEFAULT_BG_WEBP}, ${DEFAULT_BG_WEBP_2X} 2x`;
  }

  const imgHeight = height || DEFAULT_BG_HEIGHT;
  return (
    <div className="decorated-page__decor" aria-hidden="true">
      <picture>
        <source type="image/webp" srcSet={webpSrcSet}/>

        <img src={imgSrc} srcSet={imgSrcSet} width="1366" height={imgHeight} alt=""/>
      </picture>
    </div>
  );
}

export default PageDecor;
