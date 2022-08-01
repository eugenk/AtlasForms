/* This returns a template document for a given type with information about the fields ,
data type AND the arrangement/order of those fields. It could also be user to return 
additional information */

/*Default will take the first record in a collection and use it to derive this information
rather than be an explicit definition */

exports = async function(docType){
    
    const [databaseName,collectionName] = docType.namespace.split('.');
    if(!databaseName || !collectionName) { return {}}
    
    
    var collection = context.services.get("mongodb-atlas").db(databaseName).collection(collectionName);
    const exampleDoc = await collection.findOne({});
    
    if(exampleDoc == null) { return {} }

  const templateDoc = documentToTemplate(exampleDoc)
  return templateDoc;
};


function documentToTemplate(doc) {
  const templateDoc = {}
  // Iterate through the members adding each to the typemap
  for ( let key of Object.keys(doc)) {
    templateDoc[key] = typeof doc[key]
  }
  return templateDoc
}