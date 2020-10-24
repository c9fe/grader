#!/usr/bin/env node
(()=>{var e={285:(e,t,r)=>{var n=r(173),o=n.FileSystem.require(),i=r(622);o.existsSync=o.existsSync||i.existsSync;var a=r(396),s=r(333);/^win/.test(process.platform),e.exports=function(e){var t=void 0,r="";if(e&&"string"==typeof e){if(!o.existsSync(e))throw new Error(n.Errors.INVALID_FILENAME);r=e,t=new s(e,n.Constants.FILE)}else t=e&&Buffer.isBuffer(e)?new s(e,n.Constants.BUFFER):new s(null,n.Constants.NONE);function c(e,t){e=i.resolve(i.normalize(e));for(var r=t.split("/"),n=0,o=r.length;n<o;n++){var a=i.normalize(i.join(e,r.slice(n,o).join(i.sep)));if(0===a.indexOf(e))return a}return i.normalize(i.join(e,i.basename(t)))}function l(e){var r;return e&&t&&("string"==typeof e&&(r=t.getEntry(e)),"object"==typeof e&&void 0!==e.entryName&&void 0!==e.header&&(r=t.getEntry(e.entryName)),r)?r:null}return{readFile:function(e){var t=l(e);return t&&t.getData()||null},readFileAsync:function(e,t){var r=l(e);r?r.getDataAsync(t):t(null,"getEntry failed for:"+e)},readAsText:function(e,t){var r=l(e);if(r){var n=r.getData();if(n&&n.length)return n.toString(t||"utf8")}return""},readAsTextAsync:function(e,t,r){var n=l(e);n?n.getDataAsync((function(e,n){n?t(e,n):e&&e.length?t(e.toString(r||"utf8")):t("")})):t("")},deleteFile:function(e){var r=l(e);r&&t.deleteEntry(r.entryName)},addZipComment:function(e){t.comment=e},getZipComment:function(){return t.comment||""},addZipEntryComment:function(e,t){var r=l(e);r&&(r.comment=t)},getZipEntryComment:function(e){var t=l(e);return t&&t.comment||""},updateFile:function(e,t){var r=l(e);r&&r.setData(t)},addLocalFile:function(e,t,r){if(!o.existsSync(e))throw new Error(n.Errors.FILE_NOT_FOUND.replace("%s",e));t?"/"!==(t=t.split("\\").join("/")).charAt(t.length-1)&&(t+="/"):t="";var i=e.split("\\").join("/").split("/").pop();r?this.addFile(t+r,o.readFileSync(e),"",0):this.addFile(t+i,o.readFileSync(e),"",0)},addLocalFolder:function(e,t,r){if(void 0===r?r=function(){return!0}:r instanceof RegExp&&(r=function(e){return function(t){return e.test(t)}}(r)),t?"/"!==(t=t.split("\\").join("/")).charAt(t.length-1)&&(t+="/"):t="","/"!==(e=(e=i.normalize(e)).split("\\").join("/")).charAt(e.length-1)&&(e+="/"),!o.existsSync(e))throw new Error(n.Errors.FILE_NOT_FOUND.replace("%s",e));var a=n.findFiles(e),s=this;a.length&&a.forEach((function(n){var i=n.split("\\").join("/").replace(new RegExp(e.replace(/(\(|\)|\$)/g,"\\$1"),"i"),"");r(i)&&("/"!==i.charAt(i.length-1)?s.addFile(t+i,o.readFileSync(n),"",0):s.addFile(t+i,Buffer.alloc(0),"",0))}))},addLocalFolderAsync:function(e,t,r,a){void 0===a?a=function(){return!0}:a instanceof RegExp&&(a=function(e){return function(t){return e.test(t)}}(a)),r?"/"!==(r=r.split("\\").join("/")).charAt(r.length-1)&&(r+="/"):r="","/"!==(e=(e=i.normalize(e)).split("\\").join("/")).charAt(e.length-1)&&(e+="/");var s=this;o.open(e,"r",(function(i,c){if(i&&"ENOENT"===i.code)t(void 0,n.Errors.FILE_NOT_FOUND.replace("%s",e));else if(i)t(void 0,i);else{var l=n.findFiles(e),f=-1,E=function(){if((f+=1)<l.length){var n=l[f].split("\\").join("/").replace(new RegExp(e.replace(/(\(|\))/g,"\\$1"),"i"),"");n=n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\x20-\x7E]/g,""),a(n)?"/"!==n.charAt(n.length-1)?o.readFile(l[f],(function(e,o){e?t(void 0,e):(s.addFile(r+n,o,"",0),E())})):(s.addFile(r+n,Buffer.alloc(0),"",0),E()):E()}else t(!0,void 0)};E()}}))},addFile:function(e,r,n,o){var i=new a;i.entryName=e,i.comment=n||"",o||(o=i.isDirectory?1106051088:420<<16),i.attr=o,i.setData(r),t.setEntry(i)},getEntries:function(){return t?t.entries:[]},getEntry:function(e){return l(e)},getEntryCount:function(){return t.getEntryCount()},forEach:function(e){return t.forEach(e)},extractEntryTo:function(e,r,a,s){s=s||!1,a=void 0===a||a;var f=l(e);if(!f)throw new Error(n.Errors.NO_ENTRY);var E=f.entryName,u=c(r,a?E:i.basename(E));if(f.isDirectory)return u=i.resolve(u,".."),t.getEntryChildren(f).forEach((function(e){if(!e.isDirectory){var t=e.getData();if(!t)throw new Error(n.Errors.CANT_EXTRACT_FILE);var o=c(r,a?e.entryName:i.basename(e.entryName));n.writeFileTo(o,t,s)}})),!0;var d=f.getData();if(!d)throw new Error(n.Errors.CANT_EXTRACT_FILE);if(o.existsSync(u)&&!s)throw new Error(n.Errors.CANT_OVERRIDE);return n.writeFileTo(u,d,s),!0},test:function(){if(!t)return!1;for(var e in t.entries)try{if(e.isDirectory)continue;if(!t.entries[e].getData())return!1}catch(e){return!1}return!0},extractAllTo:function(e,r){if(r=r||!1,!t)throw new Error(n.Errors.NO_ZIP);t.entries.forEach((function(t){var i=c(e,t.entryName.toString());if(t.isDirectory)n.makeDir(i);else{var a=t.getData();if(!a)throw new Error(n.Errors.CANT_EXTRACT_FILE);n.writeFileTo(i,a,r);try{o.utimesSync(i,t.header.time,t.header.time)}catch(e){throw new Error(n.Errors.CANT_EXTRACT_FILE)}}}))},extractAllToAsync:function(e,r,a){if(a||(a=function(){}),r=r||!1,t){var s=t.entries,l=s.length;s.forEach((function(t){if(!(l<=0)){var s=i.normalize(t.entryName.toString());if(t.isDirectory)return n.makeDir(c(e,s)),void(0==--l&&a(void 0));t.getDataAsync((function(f,E){if(!(l<=0)){if(!E)return f?void n.writeFileToAsync(c(e,s),f,r,(function(r){try{o.utimesSync(i.resolve(e,s),t.header.time,t.header.time)}catch(e){a(new Error("Unable to set utimes"))}if(!(l<=0))return r?void(0==--l&&a(void 0)):(l=0,void a(new Error("Unable to write")))})):(l=0,void a(new Error(n.Errors.CANT_EXTRACT_FILE)));a(new Error(E))}}))}}))}else a(new Error(n.Errors.NO_ZIP))},writeZip:function(e,o){if(1===arguments.length&&"function"==typeof e&&(o=e,e=""),!e&&r&&(e=r),e){var i=t.compressToBuffer();if(i){var a=n.writeFileTo(e,i,!0);"function"==typeof o&&o(a?null:new Error("failed"),"")}}},toBuffer:function(e,r,n,o){return this.valueOf=2,"function"==typeof e?(t.toAsyncBuffer(e,r,n,o),null):t.compressToBuffer()}}}},907:(e,t,r)=>{var n=r(173),o=n.Constants;e.exports=function(){var e=10,t=10,r=0,i=0,a=0,s=0,c=0,l=0,f=0,E=0,u=0,d=0,g=0,h=0,I=0,p={};function N(e){e=new Date(e),a=(e.getFullYear()-1980&127)<<25|e.getMonth()+1<<21|e.getDate()<<16|e.getHours()<<11|e.getMinutes()<<5|e.getSeconds()>>1}return N(+new Date),{get made(){return e},set made(t){e=t},get version(){return t},set version(e){t=e},get flags(){return r},set flags(e){r=e},get method(){return i},set method(e){i=e},get time(){return new Date(1980+(a>>25&127),(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1)},set time(e){N(e)},get crc(){return s},set crc(e){s=e},get compressedSize(){return c},set compressedSize(e){c=e},get size(){return l},set size(e){l=e},get fileNameLength(){return f},set fileNameLength(e){f=e},get extraLength(){return E},set extraLength(e){E=e},get commentLength(){return u},set commentLength(e){u=e},get diskNumStart(){return d},set diskNumStart(e){d=e},get inAttr(){return g},set inAttr(e){g=e},get attr(){return h},set attr(e){h=e},get offset(){return I},set offset(e){I=e},get encripted(){return 1==(1&r)},get entryHeaderSize(){return o.CENHDR+f+E+u},get realDataOffset(){return I+o.LOCHDR+p.fnameLen+p.extraLen},get dataHeader(){return p},loadDataHeaderFromBinary:function(e){var t=e.slice(I,I+o.LOCHDR);if(t.readUInt32LE(0)!==o.LOCSIG)throw new Error(n.Errors.INVALID_LOC);p={version:t.readUInt16LE(o.LOCVER),flags:t.readUInt16LE(o.LOCFLG),method:t.readUInt16LE(o.LOCHOW),time:t.readUInt32LE(o.LOCTIM),crc:t.readUInt32LE(o.LOCCRC),compressedSize:t.readUInt32LE(o.LOCSIZ),size:t.readUInt32LE(o.LOCLEN),fnameLen:t.readUInt16LE(o.LOCNAM),extraLen:t.readUInt16LE(o.LOCEXT)}},loadFromBinary:function(p){if(p.length!==o.CENHDR||p.readUInt32LE(0)!==o.CENSIG)throw new Error(n.Errors.INVALID_CEN);e=p.readUInt16LE(o.CENVEM),t=p.readUInt16LE(o.CENVER),r=p.readUInt16LE(o.CENFLG),i=p.readUInt16LE(o.CENHOW),a=p.readUInt32LE(o.CENTIM),s=p.readUInt32LE(o.CENCRC),c=p.readUInt32LE(o.CENSIZ),l=p.readUInt32LE(o.CENLEN),f=p.readUInt16LE(o.CENNAM),E=p.readUInt16LE(o.CENEXT),u=p.readUInt16LE(o.CENCOM),d=p.readUInt16LE(o.CENDSK),g=p.readUInt16LE(o.CENATT),h=p.readUInt32LE(o.CENATX),I=p.readUInt32LE(o.CENOFF)},dataHeaderToBinary:function(){var e=Buffer.alloc(o.LOCHDR);return e.writeUInt32LE(o.LOCSIG,0),e.writeUInt16LE(t,o.LOCVER),e.writeUInt16LE(r,o.LOCFLG),e.writeUInt16LE(i,o.LOCHOW),e.writeUInt32LE(a,o.LOCTIM),e.writeUInt32LE(s,o.LOCCRC),e.writeUInt32LE(c,o.LOCSIZ),e.writeUInt32LE(l,o.LOCLEN),e.writeUInt16LE(f,o.LOCNAM),e.writeUInt16LE(E,o.LOCEXT),e},entryHeaderToBinary:function(){var n=Buffer.alloc(o.CENHDR+f+E+u);return n.writeUInt32LE(o.CENSIG,0),n.writeUInt16LE(e,o.CENVEM),n.writeUInt16LE(t,o.CENVER),n.writeUInt16LE(r,o.CENFLG),n.writeUInt16LE(i,o.CENHOW),n.writeUInt32LE(a,o.CENTIM),n.writeUInt32LE(s,o.CENCRC),n.writeUInt32LE(c,o.CENSIZ),n.writeUInt32LE(l,o.CENLEN),n.writeUInt16LE(f,o.CENNAM),n.writeUInt16LE(E,o.CENEXT),n.writeUInt16LE(u,o.CENCOM),n.writeUInt16LE(d,o.CENDSK),n.writeUInt16LE(g,o.CENATT),n.writeUInt32LE(h,o.CENATX),n.writeUInt32LE(I,o.CENOFF),n.fill(0,o.CENHDR),n},toString:function(){return'{\n\t"made" : '+e+',\n\t"version" : '+t+',\n\t"flags" : '+r+',\n\t"method" : '+n.methodToString(i)+',\n\t"time" : '+this.time+',\n\t"crc" : 0x'+s.toString(16).toUpperCase()+',\n\t"compressedSize" : '+c+' bytes,\n\t"size" : '+l+' bytes,\n\t"fileNameLength" : '+f+',\n\t"extraLength" : '+E+' bytes,\n\t"commentLength" : '+u+' bytes,\n\t"diskNumStart" : '+d+',\n\t"inAttr" : '+g+',\n\t"attr" : '+h+',\n\t"offset" : '+I+',\n\t"entryHeaderSize" : '+(o.CENHDR+f+E+u)+" bytes\n}"}}}},854:(e,t,r)=>{t.EntryHeader=r(907),t.MainHeader=r(519)},519:(e,t,r)=>{var n=r(173),o=n.Constants;e.exports=function(){var e=0,t=0,r=0,i=0,a=0;return{get diskEntries(){return e},set diskEntries(r){e=t=r},get totalEntries(){return t},set totalEntries(r){t=e=r},get size(){return r},set size(e){r=e},get offset(){return i},set offset(e){i=e},get commentLength(){return a},set commentLength(e){a=e},get mainHeaderSize(){return o.ENDHDR+a},loadFromBinary:function(s){if((s.length!==o.ENDHDR||s.readUInt32LE(0)!==o.ENDSIG)&&(s.length<o.ZIP64HDR||s.readUInt32LE(0)!==o.ZIP64SIG))throw new Error(n.Errors.INVALID_END);s.readUInt32LE(0)===o.ENDSIG?(e=s.readUInt16LE(o.ENDSUB),t=s.readUInt16LE(o.ENDTOT),r=s.readUInt32LE(o.ENDSIZ),i=s.readUInt32LE(o.ENDOFF),a=s.readUInt16LE(o.ENDCOM)):(e=n.readBigUInt64LE(s,o.ZIP64SUB),t=n.readBigUInt64LE(s,o.ZIP64TOT),r=n.readBigUInt64LE(s,o.ZIP64SIZ),i=n.readBigUInt64LE(s,o.ZIP64OFF),a=0)},toBinary:function(){var n=Buffer.alloc(o.ENDHDR+a);return n.writeUInt32LE(o.ENDSIG,0),n.writeUInt32LE(0,4),n.writeUInt16LE(e,o.ENDSUB),n.writeUInt16LE(t,o.ENDTOT),n.writeUInt32LE(r,o.ENDSIZ),n.writeUInt32LE(i,o.ENDOFF),n.writeUInt16LE(a,o.ENDCOM),n.fill(" ",o.ENDHDR),n},toString:function(){return'{\n\t"diskEntries" : '+e+',\n\t"totalEntries" : '+t+',\n\t"size" : '+r+' bytes,\n\t"offset" : 0x'+i.toString(16).toUpperCase()+',\n\t"commentLength" : 0x'+a+"\n}"}}}},753:(e,t,r)=>{e.exports=function(e){var t=r(761),n={chunkSize:1024*(parseInt(e.length/1024)+1)};return{deflate:function(){return t.deflateRawSync(e,n)},deflateAsync:function(r){var o=t.createDeflateRaw(n),i=[],a=0;o.on("data",(function(e){i.push(e),a+=e.length})),o.on("end",(function(){var e=Buffer.alloc(a),t=0;e.fill(0);for(var n=0;n<i.length;n++){var o=i[n];o.copy(e,t),t+=o.length}r&&r(e)})),o.end(e)}}}},4:(e,t,r)=>{t.Deflater=r(753),t.Inflater=r(269)},269:(e,t,r)=>{e.exports=function(e){var t=r(761);return{inflate:function(){return t.inflateRawSync(e)},inflateAsync:function(r){var n=t.createInflateRaw(),o=[],i=0;n.on("data",(function(e){o.push(e),i+=e.length})),n.on("end",(function(){var e=Buffer.alloc(i),t=0;e.fill(0);for(var n=0;n<o.length;n++){var a=o[n];a.copy(e,t),t+=a.length}r&&r(e)})),n.end(e)}}}},991:e=>{e.exports={LOCHDR:30,LOCSIG:67324752,LOCVER:4,LOCFLG:6,LOCHOW:8,LOCTIM:10,LOCCRC:14,LOCSIZ:18,LOCLEN:22,LOCNAM:26,LOCEXT:28,EXTSIG:134695760,EXTHDR:16,EXTCRC:4,EXTSIZ:8,EXTLEN:12,CENHDR:46,CENSIG:33639248,CENVEM:4,CENVER:6,CENFLG:8,CENHOW:10,CENTIM:12,CENCRC:16,CENSIZ:20,CENLEN:24,CENNAM:28,CENEXT:30,CENCOM:32,CENDSK:34,CENATT:36,CENATX:38,CENOFF:42,ENDHDR:22,ENDSIG:101010256,ENDSUB:8,ENDTOT:10,ENDSIZ:12,ENDOFF:16,ENDCOM:20,END64HDR:20,END64SIG:117853008,END64START:4,END64OFF:8,END64NUMDISKS:16,ZIP64SIG:101075792,ZIP64HDR:56,ZIP64LEAD:12,ZIP64SIZE:4,ZIP64VEM:12,ZIP64VER:14,ZIP64DSK:16,ZIP64DSKDIR:20,ZIP64SUB:24,ZIP64TOT:32,ZIP64SIZB:40,ZIP64OFF:48,ZIP64EXTRA:56,STORED:0,SHRUNK:1,REDUCED1:2,REDUCED2:3,REDUCED3:4,REDUCED4:5,IMPLODED:6,DEFLATED:8,ENHANCED_DEFLATED:9,PKWARE:10,BZIP2:12,LZMA:14,IBM_TERSE:18,IBM_LZ77:19,FLG_ENC:0,FLG_COMP1:1,FLG_COMP2:2,FLG_DESC:4,FLG_ENH:8,FLG_STR:16,FLG_LNG:1024,FLG_MSK:4096,FILE:0,BUFFER:1,NONE:2,EF_ID:0,EF_SIZE:2,ID_ZIP64:1,ID_AVINFO:7,ID_PFS:8,ID_OS2:9,ID_NTFS:10,ID_OPENVMS:12,ID_UNIX:13,ID_FORK:14,ID_PATCH:15,ID_X509_PKCS7:20,ID_X509_CERTID_F:21,ID_X509_CERTID_C:22,ID_STRONGENC:23,ID_RECORD_MGT:24,ID_X509_PKCS7_RL:25,ID_IBM1:101,ID_IBM2:102,ID_POSZIP:18064,EF_ZIP64_OR_32:4294967295,EF_ZIP64_OR_16:65535,EF_ZIP64_SUNCOMP:0,EF_ZIP64_SCOMP:8,EF_ZIP64_RHO:16,EF_ZIP64_DSN:24}},190:e=>{e.exports={INVALID_LOC:"Invalid LOC header (bad signature)",INVALID_CEN:"Invalid CEN header (bad signature)",INVALID_END:"Invalid END header (bad signature)",NO_DATA:"Nothing to decompress",BAD_CRC:"CRC32 checksum failed",FILE_IN_THE_WAY:"There is a file in the way: %s",UNKNOWN_METHOD:"Invalid/unsupported compression method",AVAIL_DATA:"inflate::Available inflate data did not terminate",INVALID_DISTANCE:"inflate::Invalid literal/length or distance code in fixed or dynamic block",TO_MANY_CODES:"inflate::Dynamic block code description: too many length or distance codes",INVALID_REPEAT_LEN:"inflate::Dynamic block code description: repeat more than specified lengths",INVALID_REPEAT_FIRST:"inflate::Dynamic block code description: repeat lengths with no first length",INCOMPLETE_CODES:"inflate::Dynamic block code description: code lengths codes incomplete",INVALID_DYN_DISTANCE:"inflate::Dynamic block code description: invalid distance code lengths",INVALID_CODES_LEN:"inflate::Dynamic block code description: invalid literal/length code lengths",INVALID_STORE_BLOCK:"inflate::Stored block length did not match one's complement",INVALID_BLOCK_TYPE:"inflate::Invalid block type (type == 3)",CANT_EXTRACT_FILE:"Could not extract the file",CANT_OVERRIDE:"Target file already exists",NO_ZIP:"No zip file was loaded",NO_ENTRY:"Entry doesn't exist",DIRECTORY_CONTENT_ERROR:"A directory cannot have content",FILE_NOT_FOUND:"File not found: %s",NOT_IMPLEMENTED:"Not implemented",INVALID_FILENAME:"Invalid filename",INVALID_FORMAT:"Invalid or unsupported zip format. No END header found"}},455:(e,t,r)=>{var n=r(147).require(),o=r(622);n.existsSync=n.existsSync||o.existsSync,e.exports=function(e){var t=e||"",r={directory:!1,readonly:!1,hidden:!1,executable:!1,mtime:0,atime:0},i=null;return t&&n.existsSync(t)?(i=n.statSync(t),r.directory=i.isDirectory(),r.mtime=i.mtime,r.atime=i.atime,r.executable=!!(1&parseInt((i.mode&parseInt("777",8)).toString(8)[0])),r.readonly=!!(2&parseInt((i.mode&parseInt("777",8)).toString(8)[0])),r.hidden="."===o.basename(t)[0]):console.warn("Invalid path: "+t),{get directory(){return r.directory},get readOnly(){return r.readonly},get hidden(){return r.hidden},get mtime(){return r.mtime},get atime(){return r.atime},get executable(){return r.executable},decodeAttributes:function(e){},encodeAttributes:function(e){},toString:function(){return'{\n\t"path" : "'+t+',\n\t"isDirectory" : '+r.directory+',\n\t"isReadOnly" : '+r.readonly+',\n\t"isHidden" : '+r.hidden+',\n\t"isExecutable" : '+r.executable+',\n\t"mTime" : '+r.mtime+'\n\t"aTime" : '+r.atime+"\n}"}}}},147:(e,t,r)=>{t.require=function(){var e=r(747);if(process.versions.electron)try{originalFs=r(Object(function(){var e=new Error("Cannot find module 'original-fs'");throw e.code="MODULE_NOT_FOUND",e}())),Object.keys(originalFs).length>0&&(e=originalFs)}catch(e){}return e}},173:(e,t,r)=>{e.exports=r(646),e.exports.FileSystem=r(147),e.exports.Constants=r(991),e.exports.Errors=r(190),e.exports.FileAttr=r(455)},646:(e,t,r)=>{var n=r(147).require(),o=r(622);n.existsSync=n.existsSync||o.existsSync,e.exports=function(){var e=[],t=r(991),i=r(190),a=o.sep;function s(e){var t=e.split(a)[0];e.split(a).forEach((function(e){if(e&&":"!==e.substr(-1,1)){var r;t+=a+e;try{r=n.statSync(t)}catch(e){n.mkdirSync(t)}if(r&&r.isFile())throw i.FILE_IN_THE_WAY.replace("%s",t)}}))}function c(e,t,r){"boolean"==typeof t&&(r=t,t=void 0);var i=[];return n.readdirSync(e).forEach((function(s){var l=o.join(e,s);n.statSync(l).isDirectory()&&r&&(i=i.concat(c(l,t,r))),t&&!t.test(l)||i.push(o.normalize(l)+(n.statSync(l).isDirectory()?a:""))})),i}return{makeDir:function(e){s(e)},crc32:function(t){"string"==typeof t&&(t=Buffer.alloc(t.length,t));var r=Buffer.alloc(4);if(!e.length)for(var n=0;n<256;n++){for(var o=n,i=8;--i>=0;)0!=(1&o)?o=3988292384^o>>>1:o>>>=1;o<0&&(r.writeInt32LE(o,0),o=r.readUInt32LE(0)),e[n]=o}for(var a=0,s=0,c=t.length,l=~a;--c>=0;)l=e[255&(l^t[s++])]^l>>>8;return a=~l,r.writeInt32LE(4294967295&a,0),r.readUInt32LE(0)},methodToString:function(e){switch(e){case t.STORED:return"STORED ("+e+")";case t.DEFLATED:return"DEFLATED ("+e+")";default:return"UNSUPPORTED ("+e+")"}},writeFileTo:function(e,t,r,i){if(n.existsSync(e)){if(!r)return!1;if(n.statSync(e).isDirectory())return!1}var a,c=o.dirname(e);n.existsSync(c)||s(c);try{a=n.openSync(e,"w",438)}catch(t){n.chmodSync(e,438),a=n.openSync(e,"w",438)}if(a)try{n.writeSync(a,t,0,t.length,0)}catch(e){throw e}finally{n.closeSync(a)}return n.chmodSync(e,i||438),!0},writeFileToAsync:function(e,t,r,i,a){"function"==typeof i&&(a=i,i=void 0),n.exists(e,(function(c){if(c&&!r)return a(!1);n.stat(e,(function(r,l){if(c&&l.isDirectory())return a(!1);var f=o.dirname(e);n.exists(f,(function(r){r||s(f),n.open(e,"w",438,(function(r,o){r?n.chmod(e,438,(function(){n.open(e,"w",438,(function(r,o){n.write(o,t,0,t.length,0,(function(){n.close(o,(function(){n.chmod(e,i||438,(function(){a(!0)}))}))}))}))})):o?n.write(o,t,0,t.length,0,(function(){n.close(o,(function(){n.chmod(e,i||438,(function(){a(!0)}))}))})):n.chmod(e,i||438,(function(){a(!0)}))}))}))}))}))},findFiles:function(e){return c(e,!0)},getAttributes:function(e){},setAttributes:function(e){},toBuffer:function(e){return Buffer.isBuffer(e)?e:0===e.length?Buffer.alloc(0):Buffer.from(e,"utf8")},readBigUInt64LE:function(e,t){var r=Buffer.from(e.slice(t,t+8));return r.swap64(),parseInt("0x"+r.toString("hex"))},Constants:t,Errors:i}}()},396:(e,t,r)=>{var n=r(173),o=r(854),i=n.Constants,a=r(4);e.exports=function(e){var t=new o.EntryHeader,r=Buffer.alloc(0),s=Buffer.alloc(0),c=!1,l=null,f=Buffer.alloc(0);function E(){return e&&Buffer.isBuffer(e)?(t.loadDataHeaderFromBinary(e),e.slice(t.realDataOffset,t.realDataOffset+t.compressedSize)):Buffer.alloc(0)}function u(e){return 8==(8&t.flags)||n.crc32(e)===t.dataHeader.crc}function d(e,o,i){if(void 0===o&&"string"==typeof e&&(e=void 0),c)return e&&o&&o(Buffer.alloc(0),n.Errors.DIRECTORY_CONTENT_ERROR),Buffer.alloc(0);var s=E();if(0===s.length)return e&&o&&o(s),s;var l=Buffer.alloc(t.size);switch(t.method){case n.Constants.STORED:if(s.copy(l),u(l))return e&&o&&o(l),l;throw e&&o&&o(l,n.Errors.BAD_CRC),new Error(n.Errors.BAD_CRC);case n.Constants.DEFLATED:var f=new a.Inflater(s);if(!e){if(f.inflate(l).copy(l,0),!u(l))throw new Error(n.Errors.BAD_CRC+" "+r.toString());return l}f.inflateAsync((function(e){e.copy(l,0),u(l)?o&&o(l):o&&o(l,n.Errors.BAD_CRC)}));break;default:throw e&&o&&o(Buffer.alloc(0),n.Errors.UNKNOWN_METHOD),new Error(n.Errors.UNKNOWN_METHOD)}}function g(r,o){if((!l||!l.length)&&Buffer.isBuffer(e))return r&&o&&o(E()),E();if(l.length&&!c){var i;switch(t.method){case n.Constants.STORED:return t.compressedSize=t.size,i=Buffer.alloc(l.length),l.copy(i),r&&o&&o(i),i;default:case n.Constants.DEFLATED:var s=new a.Deflater(l);if(!r){var f=s.deflate();return t.compressedSize=f.length,f}s.deflateAsync((function(e){i=Buffer.alloc(e.length),t.compressedSize=e.length,e.copy(i),o&&o(i)})),s=null}}else{if(!r||!o)return Buffer.alloc(0);o(Buffer.alloc(0))}}function h(e,t){return(e.readUInt32LE(t+4)<<4)+e.readUInt32LE(t)}function I(e){var r,n,o,a;e.length>=i.EF_ZIP64_SCOMP&&(r=h(e,i.EF_ZIP64_SUNCOMP),t.size===i.EF_ZIP64_OR_32&&(t.size=r)),e.length>=i.EF_ZIP64_RHO&&(n=h(e,i.EF_ZIP64_SCOMP),t.compressedSize===i.EF_ZIP64_OR_32&&(t.compressedSize=n)),e.length>=i.EF_ZIP64_DSN&&(o=h(e,i.EF_ZIP64_RHO),t.offset===i.EF_ZIP64_OR_32&&(t.offset=o)),e.length>=i.EF_ZIP64_DSN+4&&(a=e.readUInt32LE(i.EF_ZIP64_DSN),t.diskNumStart===i.EF_ZIP64_OR_16&&(t.diskNumStart=a))}return{get entryName(){return r.toString()},get rawEntryName(){return r},set entryName(e){var o=(r=n.toBuffer(e))[r.length-1];c=47===o||92===o,t.fileNameLength=r.length},get extra(){return f},set extra(e){f=e,t.extraLength=e.length,function(e){for(var t,r,n,o=0;o<e.length;)t=e.readUInt16LE(o),o+=2,r=e.readUInt16LE(o),o+=2,n=e.slice(o,o+r),o+=r,i.ID_ZIP64===t&&I(n)}(e)},get comment(){return s.toString()},set comment(e){s=n.toBuffer(e),t.commentLength=s.length},get name(){var e=r.toString();return c?e.substr(e.length-1).split("/").pop():e.split("/").pop()},get isDirectory(){return c},getCompressedData:function(){return g(!1,null)},getCompressedDataAsync:function(e){g(!0,e)},setData:function(e){l=n.toBuffer(e),!c&&l.length?(t.size=l.length,t.method=n.Constants.DEFLATED,t.crc=n.crc32(e),t.changed=!0):t.method=n.Constants.STORED},getData:function(e){return t.changed?l:d(!1,null)},getDataAsync:function(e,r){t.changed?e(l):d(!0,e)},set attr(e){t.attr=e},get attr(){return t.attr},set header(e){t.loadFromBinary(e)},get header(){return t},packHeader:function(){var e=t.entryHeaderToBinary();return r.copy(e,n.Constants.CENHDR),t.extraLength&&f.copy(e,n.Constants.CENHDR+r.length),t.commentLength&&s.copy(e,n.Constants.CENHDR+r.length+t.extraLength,s.length),e},toString:function(){return'{\n\t"entryName" : "'+r.toString()+'",\n\t"name" : "'+(c?r.toString().replace(/\/$/,"").split("/").pop():r.toString().split("/").pop())+'",\n\t"comment" : "'+s.toString()+'",\n\t"isDirectory" : '+c+',\n\t"header" : '+t.toString().replace(/\t/gm,"\t\t").replace(/}/gm,"\t}")+',\n\t"compressedData" : <'+(e&&e.length+" bytes buffer"||"null")+'>\n\t"data" : <'+(l&&l.length+" bytes buffer"||"null")+">\n}"}}}},333:(e,t,r)=>{var n=r(396),o=r(854),i=r(173);e.exports=function(e,t){var r=[],a={},s=Buffer.alloc(0),c="",l=i.FileSystem.require(),f=null,E=new o.MainHeader,u=!1;function d(){u=!0,a={},r=new Array(E.diskEntries);for(var e=E.offset,t=0;t<r.length;t++){var o=e,s=new n(f);s.header=f.slice(o,o+=i.Constants.CENHDR),s.entryName=f.slice(o,o+=s.header.fileNameLength),s.header.extraLength&&(s.extra=f.slice(o,o+=s.header.extraLength)),s.header.commentLength&&(s.comment=f.slice(o,o+s.header.commentLength)),e+=s.header.entryHeaderSize,r[t]=s,a[s.entryName]=s}}function g(){for(var e=f.length-i.Constants.ENDHDR,t=Math.max(0,e-65535),r=t,n=f.length,o=-1,a=0;e>=r;e--)if(80===f[e])if(f.readUInt32LE(e)!==i.Constants.ENDSIG)if(f.readUInt32LE(e)!==i.Constants.END64SIG){if(f.readUInt32LE(e)==i.Constants.ZIP64SIG){o=e,n=e+i.readBigUInt64LE(f,e+i.Constants.ZIP64SIZE)+i.Constants.ZIP64LEAD;break}}else r=t;else o=e,a=e,n=e+i.Constants.ENDHDR,r=e-i.Constants.END64HDR;if(!~o)throw new Error(i.Errors.INVALID_FORMAT);E.loadFromBinary(f.slice(o,n)),E.commentLength&&(s=f.slice(a+i.Constants.ENDHDR))}return t===i.Constants.FILE?(c=e,f=l.readFileSync(c),g()):t===i.Constants.BUFFER?(f=e,g()):u=!0,{get entries(){return u||d(),r},get comment(){return s.toString()},set comment(e){E.commentLength=e.length,s=e},getEntryCount:function(){return u?r.length:E.diskEntries},forEach:function(e){u?r.forEach(e):function(e){const t=E.diskEntries;let r=E.offset;for(let o=0;o<t;o++){let t=r;const o=new n(f);o.header=f.slice(t,t+=i.Constants.CENHDR),o.entryName=f.slice(t,t+=o.header.fileNameLength),r+=o.header.entryHeaderSize,e(o)}}(e)},getEntry:function(e){return u||d(),a[e]||null},setEntry:function(e){u||d(),r.push(e),a[e.entryName]=e,E.totalEntries=r.length},deleteEntry:function(e){u||d();var t=a[e];if(t&&t.isDirectory){var n=this;this.getEntryChildren(t).forEach((function(t){t.entryName!==e&&n.deleteEntry(t.entryName)}))}r.splice(r.indexOf(t),1),delete a[e],E.totalEntries=r.length},getEntryChildren:function(e){if(u||d(),e.isDirectory){var t=[],n=e.entryName,o=n.length;return r.forEach((function(e){e.entryName.substr(0,o)===n&&t.push(e)})),t}return[]},compressToBuffer:function(){u||d(),r.length>1&&r.sort((function(e,t){var r=e.entryName.toLowerCase(),n=t.entryName.toLowerCase();return r<n?-1:r>n?1:0}));var e=0,t=[],n=[],o=0;E.size=0,E.offset=0,r.forEach((function(r){var i=r.getCompressedData();r.header.offset=o;var a=r.header.dataHeaderToBinary(),s=r.rawEntryName.length,c=r.extra.toString(),l=Buffer.alloc(s+c.length);r.rawEntryName.copy(l,0),l.fill(c,s);var f=a.length+l.length+i.length;o+=f,t.push(a),t.push(l),t.push(i);var u=r.packHeader();n.push(u),E.size+=u.length,e+=f+u.length})),e+=E.mainHeaderSize,E.offset=o,o=0;var a=Buffer.alloc(e);t.forEach((function(e){e.copy(a,o),o+=e.length})),n.forEach((function(e){e.copy(a,o),o+=e.length}));var c=E.toBinary();return s&&Buffer.from(s).copy(c,i.Constants.ENDHDR),c.copy(a,o),a},toAsyncBuffer:function(e,t,n,o){u||d(),r.length>1&&r.sort((function(e,t){var r=e.entryName.toLowerCase(),n=t.entryName.toLowerCase();return r>n?-1:r<n?1:0}));var a=0,c=[],l=[],f=0;E.size=0,E.offset=0,function(t){var r=arguments.callee;if(t.length){var u=t.pop(),d=u.entryName+u.extra.toString();n&&n(d),u.getCompressedDataAsync((function(n){o&&o(d),u.header.offset=f;var g,h=u.header.dataHeaderToBinary();try{g=Buffer.alloc(d.length,d)}catch(e){g=new Buffer(d)}var I=h.length+g.length+n.length;f+=I,c.push(h),c.push(g),c.push(n);var p=u.packHeader();if(l.push(p),E.size+=p.length,a+=I+p.length,t.length)r(t);else{a+=E.mainHeaderSize,E.offset=f,f=0;var N=Buffer.alloc(a);c.forEach((function(e){e.copy(N,f),f+=e.length})),l.forEach((function(e){e.copy(N,f),f+=e.length}));var m=E.toBinary();s&&s.copy(m,i.Constants.ENDHDR),m.copy(N,f),e(N)}}))}}(r)}}}},747:e=>{"use strict";e.exports=require("fs")},622:e=>{"use strict";e.exports=require("path")},761:e=>{"use strict";e.exports=require("zlib")}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=require("child_process");var t=r(747),n=r.n(t),o=r(622),i=r.n(o);const a=require("os");var s=r.n(a),c=r(285),l=r.n(c);const f={name:"dosyago",url:"https://github.com/dosyago"},E={name:"Grader",url:"https://github.com/grader-js"},u=(process.env.PORT||process.argv[2],{}),d=i().resolve(s().homedir(),".grader","config.js");!function(){if(n().existsSync(d))try{Object.assign(u,JSON.parse(n().readFileSync(d).toString("utf-8")))}catch(e){console.warn("Error reading from preferences file",e)}else console.log("Preferences file does not exist. Creating one..."),I()}();let g=u.BasePath;var h;function I(){try{n().writeFileSync(d,JSON.stringify(u))}catch(e){console.warn("Error writing preferences file",d,u,e)}}h=process.argv[5]||u.BasePath||s().homedir(),h=i().resolve(h),g!=h&&(console.log(`Updating base path from ${g} to ${h}...`),g=h,console.log(`Base path updated to: ${g}. Saving to preferences...`),u.BasePath=g,I(),console.log("Saved!"));const p=process.env.DEBUG_grader||!0,N=(process.env.DEBUG_grader,__dirname,e=>new Promise((t=>setTimeout(t,e))));!async function(){console.log("App launcher started.");let t,r,o,a,c,u="pending";new Promise(((e,n)=>(t=e,r=n))).then((()=>u="complete")).catch((()=>u="rejected"));const d=e=>{var t;a.kill(),console.log(),t={exitTrigger:e},console.log(JSON.stringify(t)),process.exit(1)};process.on("SIGINT",d),process.on("SIGQUIT",d),process.on("SIGTSTP",d),process.on("SIGHUP",d),process.on("error",d);const g=i().resolve(__dirname,"..","build","app.zip");try{o=n().readFileSync(g)}catch(e){console.log("src build service error",e)}try{console.log("Preparing app data directory."),p&&console.log({DEBUG:p});const u=p?i().resolve(__dirname,"..","dev"):i().resolve(s().homedir(),".grader","appData",""+(E||f).name,"service_GraderDemoApp"),d=i().resolve(u,"app.zip");n().existsSync(u)||n().mkdirSync(u,{recursive:!0}),n().existsSync(d)&&n().unlinkSync(d),console.log("Inflating app contents."),n().writeFileSync(d,o);const h=new(l())(d);p&&console.log({zipName:d,name:u,appPath:g}),h.extractAllTo(u,!0),console.log("App process requested.");const I=i().resolve(u,"app","service.js");p&&console.log({procName:I}),a=(0,e.fork)(I,p?{stdio:"inherit"}:{stdio:[null,null,null,"ipc"],detached:!0}),a.on("error",((...e)=>(console.log("err",e),r(e)))),a.on("message",((...e)=>{"string"==typeof e[0]&&(c=e[0]),process.stdout.write("\n"+c),t(e)})),a.unref()}catch(e){console.log("fork err",e),console.log("App process failed. Exiting..."),process.exit(1)}console.log("App process created.");const h=[];for(;a.connected&&("string"!=typeof c||!c.startsWith("App started."));)"pending"==u&&(process.stdout.clearLine(0),process.stdout.cursorTo(0),process.stdout.write("Waiting for your system security checks: "+h.join("."))),await N(Math.round(370*Math.random())),h.push("");if(console.log(""),"string"==typeof c&&c.startsWith("App started.")){const e=Number(c.split(".")[1].trim());console,console.log("Service on port "+e),console.log("Launcher exiting successfully..."),p&&await N(2e3),process.exit(0)}else console.error("Error at",c),console.info("Check state",u,"subprocess.connected",a.connected),console.log("Launcher failed. Exiting in 5 seconds..."),await N(5e3),process.exit(1)}()})()})();