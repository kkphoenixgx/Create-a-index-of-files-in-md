import fs from 'fs'

export class CreateIndex {

    constructor(directory, pathType ){
        this._directory = directory
        this._pathType = pathType
    }

    async createIndex(ignoreImgFolder = null){

        try {
            this._directory = this._directory.split('\\').join("/");
        } catch (error) {}

        fs.readdir(this._directory , (err, files)=>{
  
            if(err){ return console.error(err) }

            console.log("all the folders that have been created:");
            console.log(files)
            
            files.forEach(file => {

                if(ignoreImgFolder != null){
                    
                    ignoreImgFolder.forEach(folder=>{
                        if(folder == file) { return console.log("excluded") }
                        else this.generateIndex(file);
                    });

                } else this.generateIndex(file);
        
            });
        });
    
    }

    async generateIndex(file){
        if ( fs.statSync(this._directory + '/' + file).isDirectory() ){
        
            let path = this._directory + `/${file}/`
            fs.readdir(path, (err, file) => {
                if(err) console.error(err)

                let folder = path.split('/')
                folder = folder[folder.length-2]

                file.forEach(subFile => {
                    console.log(`|[${subFile}](${folder}/${subFile})|` + this._pathType)
                })

            });
            
        }else{
            console.log(`|[${file}](./${file})|` + this._pathType );
        }
    }

}