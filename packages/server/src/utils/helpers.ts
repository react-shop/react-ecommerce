type GenerateSkuProps = {
  name: string;
  colorName: string;
  brand: string;
};

export class Helpers {
  generateSku({ name, colorName, brand }: GenerateSkuProps) {
    const nameSplitted = name.split(' ');

    const nameCode =
      nameSplitted.length > 1
        ? `${nameSplitted[0].charAt(0)}${nameSplitted[1].charAt(0)}`
        : `${nameSplitted[0].charAt(0)}${nameSplitted[0].charAt(1)}`;

    const colorCode = colorName.substr(0, 2); //TODO - Create a new columns at colors table that have an color code

    const brandCode = brand.substr(0, 3);

    const sku = `${nameCode}-${colorCode}-${brandCode}`;

    return sku.toUpperCase();
  }
}
