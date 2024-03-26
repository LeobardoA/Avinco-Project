import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';

const path = FileSystem.documentDirectory;

export async function ensureFileExists(filePath) {
  try {
    const fileInfo = await FileSystem.getInfoAsync(path + filePath);
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(path + filePath, ""); // Asegúrate de usar 'await' aquí
      console.log('Archivo creado:', path + filePath);
    }
  } catch (error) {
    console.error('Error al verificar o crear el archivo:', error);
  }
}

export async function readFile(filePath) {
  await ensureFileExists(filePath);
  try {
    const content = await FileSystem.readAsStringAsync(path + filePath);
    if (content) {
      const parsedContent = JSON.parse(content);
      return parsedContent;
    }
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    return null;
  }
}


export async function writeFile(filePath, data) {
  await ensureFileExists(filePath);
  try {
    const stringifiedData = JSON.stringify(data); // Convert data to JSON string
    await FileSystem.writeAsStringAsync(path + filePath, stringifiedData, { encoding: FileSystem.EncodingType.UTF8 });
    console.log('Archivo actualizado:', path + filePath);
  } catch (error) {
    console.error('Error al escribir en el archivo:', error);
  }
}

export async function setHTML(name, uri) {
  try {
    const destinoArchivo = `${FileSystem.documentDirectory}${name}`;
    await FileSystem.copyAsync({ from: uri, to: destinoArchivo });
    return destinoArchivo;
  } catch (error) {
    console.error('Error al guardar o compartir el archivo:', error);
  }
}

export const getHTML = async () => {
  try {
    const imgAsset = Asset.fromModule(require('../images/logo.png'));
    const image = await manipulateAsync(imgAsset.localUri ?? imgAsset.uri, [], { base64: true, format: SaveFormat.PNG });
    const asset = Asset.fromModule(require('../reporte/index.html'));
    await asset.downloadAsync();
    const uri = asset.localUri;
    let contenidoArchivo = await FileSystem.readAsStringAsync(uri);
    contenidoArchivo = contenidoArchivo.replace(`<img src="../images/logo.png" style="width: 2cm; height: 2cm; margin-right: 0.2cm" />`, `<img src="data:image/png;base64,${image.base64}" style="width: 2cm; height: 2cm; margin-right: 0.2cm"/>`);
    return contenidoArchivo;
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    return null; // En caso de error, devolver null o manejar el error según sea necesario
  }
}
