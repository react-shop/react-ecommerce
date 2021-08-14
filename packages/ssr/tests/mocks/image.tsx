/* eslint-disable @next/next/no-img-element */

jest.mock(`next/image`, () => ({ src, alt }: Pick<HTMLImageElement, 'src' | 'alt'>) => (
    <img src={src} alt={alt} />
  ));
  
  export {};