type GenerateSkuProps = {
  name: string;
  attributeName: string;
  brand: string;
};

type GenericProvider = {
  id: string;
};

type GenericExists = {
  data: GenericProvider[];
  dataIds: string[];
};

export class Helpers {
  generateSku({ name, attributeName, brand }: GenerateSkuProps) {
    const nameSplitted = name.split(' ');

    const nameCode =
      nameSplitted.length > 1
        ? `${nameSplitted[0].charAt(0)}${nameSplitted[1].charAt(0)}`
        : nameSplitted[0].substr(0, 2);

    const attributeCode = attributeName.substr(0, 2);

    const brandCode = brand.substr(0, 3);

    const sku = `${nameCode}-${attributeCode}-${brandCode}`;

    return sku.toUpperCase();
  }

  dataExists({ data, dataIds }: GenericExists): boolean {
    return data.some(d => dataIds.every(id => id === d.id));
  }
}
