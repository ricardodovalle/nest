import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import * as GridFsStorage from 'multer-gridfs-storage';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage: GridFsStorage;
    constructor() {
        this.gridFsStorage = new GridFsStorage({
            url: 'mongodb+srv://dbProject:BJup8f3Yno0u2qGD@cluster0-j5tj3.mongodb.net/test?retryWrites=true&w=majority',
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    const filename = file.originalname.trim();
                    const fileInfo = {
                      filename: filename
                    };
                    resolve(fileInfo);
                });
              }
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}