import * as FileSystem from 'expo-file-system';
import Cliente from './Cliente';

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
