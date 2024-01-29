import path from 'path';
import fs from 'fs';

const getFile = (req, res) => {
    const {pic} = req.params;

    const filePath = path.join(process.cwd(),"storage", pic);

    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        res.end(fileContent, 'binary');
      } else {
        res.status(404).json({ error: 'Archivo no encontrado.' });
      }

}

export default {
    getFile
}
