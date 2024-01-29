import fs from 'fs';

export const ulpoadFile = (file) => {
    const filename = `${new Date().getTime()}.png`;
    const decodedFile = Buffer.from(file.archivo.contenido, 'base64');
    const filePath = `${process.cwd()}/storage/${filename}`;

    fs.writeFile(filePath, decodedFile, (error) => {
        if (error) {
          console.error('Error al guardar el archivo:', error);
          throw error;
        }
        console.log('Archivo guardado con éxito:', filePath);
    })
    return filename;
}

export const deleteFile = (file) => {
  console.log(file);
  if (file === null) return;

  const filePath = `${process.cwd()}/storage/${file}`;
  fs.unlink(filePath, (error) => {
    if (error) {
      console.log("Error al eliminar el archivo:", file)
      console.error("Error al eliminar el archivo:", error)
      throw error;
    }
    console.log("Archivo eliminado con exito:", file);
  })
}