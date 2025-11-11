class DataBaseManager
{
    constructor()
    {
        this.db = null;
        this.request = null;
        this.store = null;
    }
    CreateOrOpenDatabase(_this,_LoadAssets,callback,_ref,_callback1)
    {
        _this.request = indexedDB.open('CRM', 2);
        // create the ImageData object store and indexes
        _this.request.onupgradeneeded = (event) => {
            _this.db = event.target.result;

            // create the ImageData object store 
            // with auto-increment id
            _this.store = _this.db.createObjectStore('FollowTheMoskovaImageData', {
                autoIncrement: true
            });

            // create an index on the email property
            // let index =  _this.store.createIndex('ImageName', 'ImageName', {
            //     unique: true
            // });
        };

        // handle the error event
        _this.request.onerror = (event) => {
            // console.error(`Database error: ${event.target.errorCode}`);
        };

        // handle the success event
        _this.request.onsuccess = function(event) {
            _this.db = event.target.result;
            // insert contacts
            _LoadAssets.LoadDataFromUrl(_LoadAssets,_ref,_callback1)
            // callback(_LoadAssets,_ref,_callback1);
        };
    }
    InsertContact(_this,name,contact) {
        // create a new transaction
        const txn = _this.db.transaction('FollowTheMoskovaImageData', 'readwrite');

        // get the ImageData object store
        const store = txn.objectStore('FollowTheMoskovaImageData');
        //
        let query = store.put(contact,name);

        // handle success case
        query.onsuccess = function (event) {
            // console.log(event);
        };
        // handle the error case
        query.onerror = function (event) {
            // console.log(event.target.errorCode);
        }
        // transaction completes
        txn.oncomplete = function () {
            // db.close();
        };
    }
    GetContactById(_this,id) 
    {
        const txn = _this.db.transaction('FollowTheMoskovaImageData', 'readonly');
        const store = txn.objectStore('FollowTheMoskovaImageData');
        let query = store.get(id);
        let result;
        query.onsuccess = (event) => {
            if (!event.target.result) 
            {
                console.log(`The contact with ${id} not found`);
            } 
            else 
            {
                result = event.target.result;
                return result;
            }
        };
        query.onerror = (event) => {
            // console.log(event.target.errorCode);
        }

        txn.oncomplete = function () {
            // db.close();
        };
    };
    GetAllImageData(ref,loadAssetsRef,_this,callback) 
    {
        let resultValue  = [];
        let resultName  = [];
        _this.request = indexedDB.open('CRM', 2);
        _this.request.onsuccess = (event) => {
            _this.db = event.target.result;
            const txn = _this.db.transaction('FollowTheMoskovaImageData', "readonly");
            const objectStore = txn.objectStore('FollowTheMoskovaImageData');            
            objectStore.openCursor().onsuccess = (event) => {
                let cursor = event.target.result;
                if (cursor) 
                {
                    let contact = cursor.value;
                    let contactName = cursor.key;
                    resultValue.push(contact);
                    resultName.push(contactName);                
                    // continue next record
                    cursor.continue();
                }
            };
            // close the database connection
            txn.oncomplete = function () {
                _this.db.close();
                callback(ref,loadAssetsRef,[resultName,resultValue]);
            };
        }
    };
    StoreImageData(_this,_Database,_DataBaseManager,_callback,_loadComplete)
    {
        _DataBaseManager.request = indexedDB.open('CRM', 2);
        // create the ImageData object store and indexes
        _DataBaseManager.request.onupgradeneeded = (event) => {
            _DataBaseManager.db = event.target.result;

            // create the ImageData object store  with auto-increment id
            _DataBaseManager.store = _DataBaseManager.db.createObjectStore('FollowTheMoskovaImageData', {
                autoIncrement: true
            });

            // create an index on the email property
            // let index =  _DataBaseManager.store.createIndex('ImageName', 'ImageName', {
            //     unique: true
            // });
        };

        // handle the error event
        _DataBaseManager.request.onerror = (event) => {
            // console.error(`Database error: ${event.target.errorCode}`);
        };

        // handle the success event
        _DataBaseManager.request.onsuccess = function(event) {
            console.log("data manager opened")
            _DataBaseManager.db = event.target.result;
            _callback(_this,_Database,_loadComplete);
        };
    };
    ClearDataBase(_this)
    {
        _this.request = indexedDB.open('CRM', 1);
        _this.request.onsuccess = (event) => {
            _this.db = event.target.result;
            if( _this.db.objectStoreNames.contains("FollowTheMoskovaImageData"))
            {
                const txn = _this.db.transaction('FollowTheMoskovaImageData', "readwrite");
                const objectStore = txn.objectStore('FollowTheMoskovaImageData');  
                let  objectStoreRequest = objectStore.clear();
                // close the database connection
                objectStoreRequest.onsuccess  = function () {
                    _this.db.close();
                };
            }  
            else
            {
                // window.indexedDB.deleteDatabase('CRM');
                _this.db.close();
            }        
        }
    };
    CloseDB(_DataBaseManager)
    {
        _DataBaseManager.db.close();
    }
}
let _DataBaseManager = new DataBaseManager();

export { _DataBaseManager as DataBaseManager };
