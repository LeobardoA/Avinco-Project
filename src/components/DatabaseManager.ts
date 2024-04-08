import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import Service from './Service';
import DeviceData from './DeviceData';

const path = FileSystem.documentDirectory;

export async function ensureFileExists(filePath: string) {
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

export async function readFile(filePath: string) {
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


export async function writeFile(filePath: string, data: string) {
  await ensureFileExists(filePath);
  try {
    const stringifiedData = JSON.stringify(data); // Convert data to JSON string
    await FileSystem.writeAsStringAsync(path + filePath, stringifiedData, { encoding: FileSystem.EncodingType.UTF8 });
    console.log('Archivo actualizado:', path + filePath);
  } catch (error) {
    console.error('Error al escribir en el archivo:', error);
  }
}

export async function setHTML(name: string, uri: string) {
  try {
    const destinoArchivo = `${FileSystem.documentDirectory}${name}`;
    await FileSystem.copyAsync({ from: uri, to: destinoArchivo });
    return destinoArchivo;
  } catch (error) {
    console.error('Error al guardar o compartir el archivo:', error);
  }
}

export const getHTML = async (servicio: Service) => {

  const imgAsset = Asset.fromModule(require('../images/logo.png'));
  const image = await manipulateAsync(imgAsset.localUri ?? imgAsset.uri, [], { base64: true, format: SaveFormat.PNG });
  return `<!DOCTYPE html>
  <html lang="ES">
  
  <head>
    <title>Reporte De Servicio</title>
    <style>
      @page {
        margin: 0;
      }
  
      body {
        font-family: Arial, sans-serif;
        padding: 0;
        margin: 0;
      }
  
      .hoja-a4 {
        width: 21.59cm;
        margin: 0 auto;
        box-sizing: border-box;
        background-color: white;
        position: relative;
        border-color: black;
        border-width: 1px;
        border-style: solid;
      }
  
      .tl_triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 3cm 3cm 0 0;
        border-color: #000342 transparent transparent transparent;
        /* Establecer el ancho del borde para que se aplique el gradiente */
        position: absolute;
        /* Cambiar a posición absoluta */
        top: 0;
        left: 0;
      }
  
      .br_triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 3cm 3cm;
        border-color: transparent transparent #4d0000 transparent;
        /* Establecer el ancho del borde para que se aplique el gradiente */
        position: absolute;
        /* Cambiar a posición absoluta */
        bottom: 0;
        right: 0;
      }
  
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 50px;
        position: relative;
        z-index: 1;
        width: 21.59cm;
      }
  
      .header {
        display: flex;
        width: 100%;
        height: 5cm;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        top: 0px;
      }
  
      .services {
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 90%;
      }
  
      .logo {
        flex-direction: row;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6cm;
        height: 2cm;
        position: absolute;
        top: 0.25cm;
        left: 2.5cm;
      }
  
      .meta-data {
        flex-direction: row;
        display: flex;
        justify-content: start;
        align-items: center;
        width: 8.5cm;
        height: 2cm;
        position: absolute;
        top: 0.25cm;
        right: 1.5cm;
        border-color: black;
        border-width: 1px;
        border-radius: 15px;
        border-style: solid;
        overflow: hidden;
      }
  
      .meta-data-title-tab {
        display: flex;
        flex-direction: column;
        color: white;
        height: 100%;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: black;
      }
  
      .meta-data-title-content {
        background-color: #000561;
        margin: 0;
        text-align: center;
        height: 0.5cm;
        font-size: 0.4cm;
      }
  
      .date-container {
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
      }
  
      .date-container div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
  
      .date-container p {
        margin: 0;
        color: black;
        font-size: 0.4cm;
      }
  
      .date-container h2 {
        color: white;
        margin: 0;
        font-size: 0.45cm;
        font-weight: bold;
        background-color: #3949ab;
        padding-left: 0.3cm;
        padding-right: 0.3cm;
        padding-top: 0.1cm;
        padding-bottom: 0.1cm;
        border-radius: 12px;
      }
  
      .client-data-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        top: 2.5cm;
        width: 90%;
        height: 2.5cm;
        position: absolute;
        overflow: hidden;
      }
  
      .client-data-container div {
        margin: 0;
        display: flex;
        flex-direction: row;
      }
  
      .client-data-container p {
        margin: 0px;
        color: black;
        font-size: 0.5cm;
      }
  
      .client-data-container h2 {
        margin: 0px;
        font-size: 0.5cm;
        font-weight: normal;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        padding-left: 0.4cm;
      }
  
      .footer {
        display: flex;
        width: 100%;
        height: 3cm;
        justify-content: center;
        align-items: end;
      }
  
      .footer-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 80%;
        margin-bottom: 0.5cm;
      }
  
      .footer-info pre {
        font-family: Arial, Helvetica, sans-serif;
        margin: 3px;
        font-size: 0.35cm;
      }
  
      .serviceContainer {
        border-radius: 25px;
        border-width: 3px;
        border-color: #666;
        border-style: solid;
        padding-left: 0.5cm;
        padding-right: 0.5cm;
        margin-top: 0.5cm;
        margin-bottom: 0.5cm;
      }
  
      .serviceRowContainer {
        display: flex;
        flex-direction: row;
      }
  
      .serviceRowInputContainer {
        display: flex;
        flex-direction: row;
        padding-left: 0.2cm;
        padding-right: 0.2cm;
        margin: 0px;
      }
  
      .serviceRowInputLine {
        display: flex;
        align-items: end;
        justify-content: start;
        flex: 1;
        border-bottom-style: solid;
        border-bottom-width: 3px;
        margin-left: 0.2cm;
        margin-top: 0px;
        margin-bottom: 15px;
        padding-left: 0.6cm;
      }
  
      table {
        border-collapse: collapse;
      }
  
      th,
      td {
        border: 1px solid #222;
        text-align: center;
        padding: 4px;
      }
  
      th {
        background-color: #BBB;
      }
  
      .tableContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
  
      .checkers {
        margin-top: 0.5cm;
        font-size: 16px;
      }
  
      .checkersItemContainer {
        display: flex;
        flex-direction: row;
        flex: 3;
        justify-content: space-between;
        padding-right: 10px;
      }
  
      .checkersItemContainer p {
        margin: 5px 0px 5px 0px;
      }
  
      .checkerCheck {
        display: flex;
        border-width: 1px;
        border-style: solid;
        justify-content: center;
        align-items: center;
        width: 0.6cm;
        height: 0.6cm;
      }
    </style>
  </head>
  
  <body>
    <div class="hoja-a4">
      <!-- CONTENIDO -->
      <div class="container">
        <!-- HEADER -->
        <div class="header">
          <!-- Logo -->
          <div class="logo">
          <img src="data:image/png;base64,${image.base64}" style="width: 2cm; height: 2cm; margin-right: 0.2cm"/>
            <div style="
                  display: flex;
                  flex-direction: column;
                  height: 2cm;
                  justify-content: center;
                ">
              <p style="
                    color: #ff8800;
                    font-size: 2em;
                    margin: 0;
                    font-weight: bold;
                  ">
                AVINCO
              </p>
              <p style="
                    color: #3949ab;
                    font-size: 0.6em;
                    margin: 0;
                    font-weight: bold;
                  ">
                AVI, Instalaciones Climáticas de Occidente S de R.L. de CV.
              </p>
            </div>
          </div>
          <!-- META DATA [Fecha y eso pueh...]-->
          <div class="meta-data">
            <div class="meta-data-title-tab" style="width: 5.5cm;">
              <p class="meta-data-title-content">Fecha:</p>
              <div class="date-container">
                <div>
                  <p>Dia</p>
                  <h2>${servicio.date_day}</h2>
                </div>
                <div>
                  <p>Mes</p>
                  <h2>${servicio.date_month}</h2>
                </div>
                <div>
                  <p>Año</p>
                  <h2>${servicio.date_year}</h2>
                </div>
              </div>
            </div>
            <div class="meta-data-title-tab" style="width: 3cm;">
              <p class="meta-data-title-content">No. de Reporte</p>
              <p style="
              display: flex;
              flex: 1;
              justify-content: center;
              align-items: center;
              color: red;
              font-weight: bold;
              font-size: 22px;
              font-family: 'Courier New', Courier, monospace;
              margin: 0;
              height: auto;
              ">${servicio.serviceID}</p>
            </div>
          </div>
          <!-- CLIENT DATA -->
          <div class="client-data-container">
            <div>
              <p>Cliente:</p>
              <h2 style="width: 12cm;">${servicio.clientName}</h2>
              <p>Tel:</p>
              <h2 style="width: 6cm;">${servicio.clientTel}</h2>
            </div>
            <div>
              <p>Domicilio:</p>
              <h2 style="width: 20cm;">${servicio.clientLocation}</h2>
            </div>
          </div>
        </div>
        <!-- SERVICES -->
        <div class="services">
          ${newService(servicio.deviceData)}
        </div>
        <!-- FOOTER -->
        <div class="footer">
          <div class="footer-info">
            <pre>www.avinco.com.mx   Tel: (33) 3604 2630 y 3604 6139   Cel.33 3196 3497</pre>
            <pre>administracion@avinco.com.mx     ingenieriadeconfort@hotmail.com</pre>
            <pre>Esther Tapia de Castellanos #3717   Col. Beatriz Hernández, Guadalajara, Jalisco.</pre>
          </div>
        </div>
      </div>
      <!-- TRIANGULOS [NO TOCAR] -->
      <div class="tl_triangle">
        <div class="tl_triangle_border"></div>
      </div>
      <div class="br_triangle">
        <div class="br_triangle_border"></div>
      </div>
    </div>
  </body>
  
  </html>`;
}

export const newService = (deviceData: DeviceData[]) => {
  let stringBuilder = '';
  deviceData.forEach((value, index) => {
    if (value.isEmpty) {
      console.log("Hi");
      
      let cad = `<div class="serviceContainer">
  <!-- EQUIPO TIPO / CAPACIDAD -->
  <div class="serviceRowContainer">
    <div class="serviceRowInputContainer" style=" flex: 2;">
      <p>Equipo Tipo:</p>
      <p class="serviceRowInputLine">${deviceData[index].deviceType}</p>
    </div>
    <div class="serviceRowInputContainer" style="flex: 1;">
      <p>Capacidad:</p>
      <p class="serviceRowInputLine">${deviceData[index].deviceCapacity}</p>
    </div>
  </div>
  <!-- MODELO / SERIE -->
  <div class="serviceRowContainer">
    <div class="serviceRowInputContainer" style=" flex: 1;">
      <p>Modelo:</p>
      <p class="serviceRowInputLine">${deviceData[index].deviceModel}</p>
    </div>
    <div class="serviceRowInputContainer" style="flex: 1;">
      <p>Serie:</p>
      <p class="serviceRowInputLine">${deviceData[index].deviceSerial}</p>
    </div>
  </div>
  <!-- TIPO SERVICIO -->
  <div class="serviceRowContainer">
    <div class="serviceRowInputContainer" style=" flex: 2;">
      <p>Tipo De Servicio:</p>
      <p class="serviceRowInputLine">${deviceData[index].typeOfService}</p>
    </div>
  </div>
  <!-- VOLTAJES Y AMPERAJES -->
  <div class="tableContainer">
    <table>
      <thead>
        <tr>
          <th colspan="2">Compresor</th>
        </tr>
        <tr>
          <th>Voltaje</th>
          <th>Amperaje</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${deviceData[index].compressorVoltage}</td>
          <td>${deviceData[index].compressorAmp}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th colspan="2">Motor Condensador</th>
        </tr>
        <tr>
          <th>Voltaje</th>
          <th>Amperaje</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${deviceData[index].motorCVoltage}</td>
          <td>${deviceData[index].motorCAmp}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th colspan="2">Motor Evaporador</th>
        </tr>
        <tr>
          <th>Voltaje</th>
          <th>Amperaje</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${deviceData[index].motorEVoltage}</td>
          <td>${deviceData[index].motorEAmp}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- CHECKS -->
  <div class="checkers">
    <div style="display: flex; flex: 1;">
      <div class="checkersItemContainer">
        <p>Limpieza Serpentin Evap.</p>
        <p class="checkerCheck">${deviceData[index].isSerpentinEv ? 'X' : ''}</p>
      </div>
      <div class="checkersItemContainer">
        <p>Limpieza de Equipo.</p>
        <p class="checkerCheck">${deviceData[index].isDeviceCleaning ? 'X' : ''}</p>
      </div>
      <div class="checkersItemContainer" style="flex: 2;">
        <p>Lubricacion.</p>
        <p class="checkerCheck">${deviceData[index].isLubrication ? 'X' : ''}</p>
      </div>
    </div>
    <div style="display: flex; flex: 1;">
      <div class="checkersItemContainer">
        <p>Limpieza Serpentin Cond.</p>
        <p class="checkerCheck">${deviceData[index].isSerpentinCd ? 'X' : ''}</p>
      </div>
      <div class="checkersItemContainer">
        <p>Limpieza Tablero Elec.</p>
        <p class="checkerCheck">${deviceData[index].isElectricCircuit ? 'X' : ''}</p>
      </div>
      <div class="checkersItemContainer" style="flex: 2;">
        <p>Presion Baja.</p>
        <p class="checkerCheck">${deviceData[index].isLowPressure ? 'X' : ''}</p>
      </div>
    </div>
    <div style="display: flex; flex: 1;">
      <div class="checkersItemContainer">
        <p>Limpieza de Filtros.</p>
        <p class="checkerCheck">${deviceData[index].isFilterCleaning ? 'X' : ''}</p>
      </div>
      <div class="checkersItemContainer">
        <p>Revision Terminales.</p>
        <p class="checkerCheck">${deviceData[index].isTerminalsCheck ? 'X' : ''}</p>
      </div>
      <div class="checkersItemContainer" style="flex: 2;">
        <p>Presion Alta.</p>
        <p class="checkerCheck">${deviceData[index].isHighPressure ? 'X' : ''}</p>
      </div>
    </div>
  </div>
  <!-- NOTAS -->
  <div>
    <p>Notas:</p>
    <p style="
    border-bottom-style: solid;
    border-bottom-width: 1px;
    margin-top: 0px;
    margin-bottom: 15px;">${deviceData[index].notes}</p>
  </div>
</div>`;
      stringBuilder = stringBuilder.concat(cad);
    }
  });
  return stringBuilder;
}