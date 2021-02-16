(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{106:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return l}));var a=n(3),r=n(7),o=(n(0),n(110)),i={title:"Working with contracts having complex storage/parameters",author:"Roxane Letourneau"},s={unversionedId:"complex_parameters",id:"complex_parameters",isDocsHomePage:!1,title:"Working with contracts having complex storage/parameters",description:"This section shows how Taquito can be used to :",source:"@site/../docs/complex_parameters.md",slug:"/complex_parameters",permalink:"/docs/complex_parameters",version:"current",sidebar:"docs",previous:{title:"Ledger signer",permalink:"/docs/ledger_signer"},next:{title:"Storage with/without annotations",permalink:"/docs/storage_annotations"}},p=[{value:"Origination of a contract with complex storage",id:"origination-of-a-contract-with-complex-storage",children:[]},{value:"Calling the function of a contract having a complex object as a parameter",id:"calling-the-function-of-a-contract-having-a-complex-object-as-a-parameter",children:[]}],c={toc:p};function l(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"This section shows how Taquito can be used to :"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Originate a contract with complex storage"),Object(o.b)("li",{parentName:"ul"},"Call a contract function with a complex object as a parameter"),Object(o.b)("li",{parentName:"ul"},"Pass null value to some optional arguments")),Object(o.b)("p",null,"The source code of the contract used in the following examples is available ",Object(o.b)("a",{parentName:"p",href:"https://better-call.dev/carthagenet/KT1TRHzT3HdLe3whe35q6rNxavGx8WVFHSpH/code"},"here"),"."),Object(o.b)("h2",{id:"origination-of-a-contract-with-complex-storage"},"Origination of a contract with complex storage"),Object(o.b)("p",null,"Here we have the storage of the contract defined in Michelson."),Object(o.b)("p",null,"This storage uses a pair which is itself composed of a pair and a ",Object(o.b)("inlineCode",{parentName:"p"},"map")," (annotated as %validators). The nested pair consists of an address (annotated as %owner) and a ",Object(o.b)("inlineCode",{parentName:"p"},"bigMap")," (annotated as %records). The ",Object(o.b)("inlineCode",{parentName:"p"},"map %validators")," uses a natural number (",Object(o.b)("inlineCode",{parentName:"p"},"nat"),") as its key and an address as its value. The ",Object(o.b)("inlineCode",{parentName:"p"},"bigMap %records")," uses a value in ",Object(o.b)("inlineCode",{parentName:"p"},"bytes")," as its key and a pair consisting of nested pairs as its value. In these nested pairs, we find addresses and natural numbers, where some are optional, and a ",Object(o.b)("inlineCode",{parentName:"p"},"map")," (annotated %data). The ",Object(o.b)("inlineCode",{parentName:"p"},"map %data")," uses a ",Object(o.b)("inlineCode",{parentName:"p"},"string")," as its key and the user needs to choose the value of the ",Object(o.b)("inlineCode",{parentName:"p"},"map")," between different proposed types (",Object(o.b)("inlineCode",{parentName:"p"},"int"),", ",Object(o.b)("inlineCode",{parentName:"p"},"bytes"),", ",Object(o.b)("inlineCode",{parentName:"p"},"bool"),", ...). We can notice in this example that all the arguments are identified by an annotation."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"storage (pair\n          (pair (address %owner)\n                (big_map %records bytes\n                          (pair\n                            (pair\n                              (pair (option %address address)\n                                    (map %data string\n                                               (or\n                                                 (or\n                                                   (or\n                                                     (or (address %address)\n                                                         (bool %bool))\n                                                     (or (bytes %bytes)\n                                                         (int %int)))\n                                                   (or\n                                                     (or (key %key)\n                                                         (key_hash %key_hash))\n                                                     (or (nat %nat)\n                                                         (signature %signature))))\n                                                 (or\n                                                   (or (string %string)\n                                                       (mutez %tez))\n                                                   (timestamp %timestamp)))))\n                              (pair (address %owner) (option %ttl nat)))\n                            (option %validator nat))))\n          (map %validators nat address));\n")),Object(o.b)("p",null,"In this example, we originate the contract with initial values in the storage. We use the ",Object(o.b)("inlineCode",{parentName:"p"},"MichelsonMap")," class' of Taquito to initialize ",Object(o.b)("a",{parentName:"p",href:"https://tezostaquito.io/docs/maps_bigmaps"},"the maps and the bigMap"),". "),Object(o.b)("p",null,"As described above, the ",Object(o.b)("inlineCode",{parentName:"p"},"map %data")," uses a value that we chose between different types. When using Taquito, we need to surround the chosen argument with curly braces. In the current example, we initialize value in the ",Object(o.b)("inlineCode",{parentName:"p"},"map %data")," to the boolean true : ",Object(o.b)("inlineCode",{parentName:"p"},"{ bool : true }"),"."),Object(o.b)("p",null,"Since every argument is identified by an annotation, we can ignore optional values if they are not needed. In the first entry of the ",Object(o.b)("inlineCode",{parentName:"p"},"bigMap %records")," of this example, we do not specify a value for the ",Object(o.b)("inlineCode",{parentName:"p"},"address %address"),", the ",Object(o.b)("inlineCode",{parentName:"p"},"nat %ttl")," and the ",Object(o.b)("inlineCode",{parentName:"p"},"nat %validator"),", but we define one for the ",Object(o.b)("inlineCode",{parentName:"p"},"nat %validator")," of the second entry of the bigMap."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},"// import { TezosToolkit, MichelsonMap } from '@taquito/taquito';\n// import { importKey } from '@taquito/signer';\n// const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet');\n\n//%data\nconst dataMap = new MichelsonMap();\n//key is a string, we choose a boolean for the value\ndataMap.set('Hello', { bool : true })\n\n//%records \nconst recordsBigMap = new MichelsonMap();\nrecordsBigMap.set(\n    'FFFF', //key of the bigMap %records is in bytes\n    { //address %address is optional,\n      data : dataMap,\n      owner : 'tz1PgQt52JMirBUhhkq1eanX8hVd1Fsg71Lr',\n      //nat %ttl is optional\n      //nat %validator is optional\n    })\nrecordsBigMap.set(\n    'AAAA', //key of the bigMap %records is in bytes\n    { //address %address is optional\n      data : dataMap,\n      owner : 'tz1PgQt52JMirBUhhkq1eanX8hVd1Fsg71Lr',\n      //nat %ttl is optional\n      validator : '1' //nat %validator is optional\n    })\n\n//%validators\nconst validatorsMap = new MichelsonMap();\n//key is a nat, value is an address\nvalidatorsMap.set('1', 'tz1btkXVkVFWLgXa66sbRJa8eeUSwvQFX4kP')\n\nimportKey(Tezos, emailExample, passwordExample, mnemonicExample, secretExample)\n.then(() => {\n  return Tezos.contract.originate({\n    code : contractJson,\n    storage : {\n      owner : 'tz1PgQt52JMirBUhhkq1eanX8hVd1Fsg71Lr', //address\n      records: recordsBigMap, \n      validators : validatorsMap\n    }})\n}).then((contractOriginated) => {\n  println(`Waiting for confirmation of origination for ${contractOriginated.contractAddress}...`);\n  return contractOriginated.contract();\n}).then((contract) => {\n  println(`Origination completed.`);\n}).catch((error) => println(`Error: ${JSON.stringify(error, null, 2)}`));\n")),Object(o.b)("h2",{id:"calling-the-function-of-a-contract-having-a-complex-object-as-a-parameter"},"Calling the function of a contract having a complex object as a parameter"),Object(o.b)("p",null,"The contract contains a function named ",Object(o.b)("inlineCode",{parentName:"p"},"set_child_record"),". The parameter of the function is composed of nested pairs regrouping different datatypes (address, ",Object(o.b)("inlineCode",{parentName:"p"},"map"),", ",Object(o.b)("inlineCode",{parentName:"p"},"bytes")," and ",Object(o.b)("inlineCode",{parentName:"p"},"nat"),"). Two of its arguments, the ",Object(o.b)("inlineCode",{parentName:"p"},"address %address")," and the ",Object(o.b)("inlineCode",{parentName:"p"},"nat %ttl"),", are optional. The ",Object(o.b)("inlineCode",{parentName:"p"},"map %data")," uses a ",Object(o.b)("inlineCode",{parentName:"p"},"string")," as its key and the user needs to choose the value of the ",Object(o.b)("inlineCode",{parentName:"p"},"map")," between different proposed types. "),Object(o.b)("p",null,"Here is the parameter of the function defined in Michelson :"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre"},"(pair %set_child_record\n        (pair\n          (pair (option %address address)\n                (map %data string\n                           (or\n                             (or\n                               (or (or (address %address) (bool %bool))\n                                   (or (bytes %bytes) (int %int)))\n                               (or (or (key %key) (key_hash %key_hash))\n                                   (or (nat %nat) (signature %signature))))\n                             (or (or (string %string) (mutez %tez))\n                                 (timestamp %timestamp)))))\n          (pair (bytes %label) (address %owner)))\n        (pair (bytes %parent) (option %ttl nat)))\n")),Object(o.b)("p",null,"The way to write the parameter when calling the function of a contract with Taquito differs from the way of writing its storage during the origination step. When calling the contract function, we do not write the annotations of the arguments (nor the indexes). So the order of the arguments is important. Before calling the contract function, it may be useful to use Taquito's ",Object(o.b)("inlineCode",{parentName:"p"},"toTransferParams")," method to inspect the parameter."),Object(o.b)("h4",{id:"inspect-parameter"},"Inspect parameter"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},"// import { TezosToolkit, MichelsonMap } from '@taquito/taquito';\n// const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet')\n// import { importKey } from '@taquito/signer';\n\nimportKey(Tezos, emailExample, passwordExample, mnemonicExample, secretExample)\n.then(signer => {\n    return Tezos.contract.at('KT1Guzg4pWj5BEyc8qtoicNsuPCYfjRbYLZc')\n}).then(myContract => {\n    const dataMap = new MichelsonMap();\n    dataMap.set(\"Hello World\", { bool : true })\n    let inspect = myContract.methods.set_child_record('tz1PgQt52JMirBUhhkq1eanX8hVd1Fsg71Lr', dataMap, 'EEEE', 'tz1PgQt52JMirBUhhkq1eanX8hVd1Fsg71Lr', 'FFFF', '10').toTransferParams(); \n    println(JSON.stringify(inspect, null, 2))\n}).catch(error => println(`Error: ${JSON.stringify(error, null, 2)}`));\n")),Object(o.b)("h4",{id:"call-the-set_child_record-function-when-all-the-arguments-are-defined"},"Call the set_child_record function when all the arguments are defined"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},"// import { TezosToolkit, MichelsonMap } from '@taquito/taquito';\n// const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet')\n// import { importKey } from '@taquito/signer';\n\nimportKey(Tezos, emailExample, passwordExample, mnemonicExample, secretExample)\n.then(signer => {\n    return Tezos.contract.at('KT1Guzg4pWj5BEyc8qtoicNsuPCYfjRbYLZc')\n}).then(myContract => {\n    const dataMap = new MichelsonMap();\n    dataMap.set(\"Hello World\", { bool : true })\n  \n    return myContract.methods.set_child_record(\n      'tz1PgQt52JMirBUhhkq1eanX8hVd1Fsg71Lr', //address(optional)\n      dataMap, //data\n      'EEEE', //label\n      'tz1PgQt52JMirBUhhkq1eanX8hVd1Fsg71Lr', //owner\n      'FFFF', //parent\n      '10' //ttl(optional)\n    ).send(); \n}).then(op => {\n    println(`Waiting for ${op.hash} to be confirmed...`);\n    return op.confirmation(1).then(() => op.hash);\n}).then(hash => {\n    println(`Operation injected: https://better-call.dev/delphinet/KT1Guzg4pWj5BEyc8qtoicNsuPCYfjRbYLZc/operations`);\n}).catch(error => println(`Error: ${JSON.stringify(error, null, 2)}`));\n")),Object(o.b)("h4",{id:"call-the-set_child_record-function-when-optional-arguments-are-null"},"Call the set_child_record function when optional arguments are null"),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"address %address")," and the ",Object(o.b)("inlineCode",{parentName:"p"},"nat %ttl")," of the ",Object(o.b)("inlineCode",{parentName:"p"},"set_child_record")," function are optional. If we want one or both to be null, we must specify the value of the argument as ",Object(o.b)("inlineCode",{parentName:"p"},"null")," or ",Object(o.b)("inlineCode",{parentName:"p"},"undefined"),"."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js",metastring:"live noInline",live:!0,noInline:!0},"// import { TezosToolkit, MichelsonMap } from '@taquito/taquito';\n// const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet')\n// import { importKey } from '@taquito/signer';\n\nimportKey(Tezos, emailExample, passwordExample, mnemonicExample, secretExample)\n.then(signer => {\n    return Tezos.contract.at('KT1Guzg4pWj5BEyc8qtoicNsuPCYfjRbYLZc')\n}).then(myContract => {\n    const dataMap = new MichelsonMap();\n    dataMap.set(\"Hello World\", { nat : '3' })\n  \n    return myContract.methods.set_child_record(\n      null, //address(optional)\n      dataMap, //data\n      'EEEE', //label\n      'tz1PgQt52JMirBUhhkq1eanX8hVd1Fsg71Lr', //owner\n      'FFFF', //parent\n      undefined //ttl(optional)\n    ).send(); \n}).then(op => {\n    println(`Waiting for ${op.hash} to be confirmed...`);\n    return op.confirmation(1).then(() => op.hash);\n}).then(hash => {\n    println(`Operation injected: https://better-call.dev/delphinet/KT1Guzg4pWj5BEyc8qtoicNsuPCYfjRbYLZc/operations`);\n}).catch(error => println(`Error: ${JSON.stringify(error, null, 2)}`));\n")))}l.isMDXComponent=!0},110:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return b}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),l=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=l(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},h=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),d=l(n),h=a,b=d["".concat(i,".").concat(h)]||d[h]||m[h]||o;return n?r.a.createElement(b,s(s({ref:t},c),{},{components:n})):r.a.createElement(b,s({ref:t},c))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=h;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}h.displayName="MDXCreateElement"}}]);