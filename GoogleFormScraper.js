/**
 * This is the function that is triggered when a form is submitted
 * Do not touch this if you are not comfortable writing ES6 javascript
 */
function googleFormSubmit() {
  const adoption_contract_form_id = '1-vm9G5_I1JtccnnenAR5CrSdZABzDDM-Hw4BlY2zzdM';
  const adoption_contract_form = FormApp.openById(adoption_contract_form_id);
  const adoption_contract_form_responses = adoption_contract_form.getResponses();
 
  /**
   * Loop through all of the questions and corresponding responses from the Google Form submission
   */
  adoption_contract_form_responses.forEach(response => {
    const item_responses = response.getItemResponses();
    // Make an empty object to hold all of the submitted form data
    const adoption_contract_form_data = {};

  /**
   * Fetch any of the section titles and corresponding responses from the Google Form submission
   */
    item_responses.forEach(item_response => {
      const question = item_response.getItem().getTitle();
      const answer = item_response.getResponse();

    /**
     * Create a Map using the Google Form submitted question as the key, and the answer as the value
     */
      adoption_contract_form_data[question] = answer;
    });

    /**
     * Fetch the email address of the person who submitted the Google Form because fetching the email address is for some reason different than all the other data fetched
     */
    const respondent_email = response.getRespondentEmail();
    autoFillAdoptionContractFromForm(adoption_contract_form_data, respondent_email);
  });
}

/**
 * I made this function in such a way that if you change any text on the form, or need to change the Google Drive file/folder location, you can do so without the risk of breaking the script.
 * The 'file' variable holds the value retrieved from a URI like so: https://docs.google.com/document/d/1LJE4avVjdC3Infb5AQRarDTAFBVohLY35c7R5syfOy8/edit. The file id is between '/d' and '/edit'
 * The 'folder' variable is the same: https://drive.google.com/drive/u/3/folders/1jMM5cN-2U9xyqmiLsuLkfOdc-ywW2mau. The folder id is after '/folders'/, and before any other possible content
 * Gillian: If you change any text on the Google Form, this script will break. It will still generate a contract document, but will have a {{x}} somewhere, where x is any text.
 * To fix the broken form, you have to go to the specific section referenced by the variable A[5-23] in the Google Form and copy/paste the text from that section into the string in 'form_data[]'
 * Be sure to keep the '' characters around the string of text otherwise the script will not be able to fetch the data from the Google Form. 
 */
function autoFillAdoptionContractFromForm(form_data, adopters_email) {
  /**
   * The actual file and folder id of what we are targetting from Google Drive
   */
  const google_drive_contract_file = DriveApp.getFileById("1-ZqOp_fBIuzAAKS6TSAc4vfwJyPcnUn4LUCxhGzE8y8");
  const google_drive_contract_folder = DriveApp.getFolderById("1jMM5cN-2U9xyqmiLsuLkfOdc-ywW2mau");


  /******************************************************************************************************************************************************************
   * The section where you might modify some form text                                                                                                              *
   *                                                                                                                                                                *
   ******************************************************************************************************************************************************************
   */
  const adopters = form_data['Name/s of Adopter/s - The name/s provided will be the legal adopters of the dog. Please ensure to provide full names - first and last.'];

  const adopters_address = form_data['FULL mailing address - street number, street name, unit number, city, province, postal code.'];

  const adopters_phone_number = form_data['Telephone number/s'];

  const payment = form_data['Non-Refundable Adoption Fee: $1,500.00 CDN paid via cash/cheque or via electronic funds/money transfer/PayPal to ggreyhoundadoptions@gmail.com. Please indicate below how you wish to pay'];

  const A5 = form_data["The welfare of this dog is my/our sole responsibility and I/we agree to care for this dog in a safe and humane manner, and as a family pet and companion. The dog will have appropriate food, water, shelter and medical care for the duration of their life."];

  const A6 = form_data['I am/We are not adopting this dog for another person, nor will I/we give the dog to another person without the express written consent of GGA.'];

  const A7 = form_data['I/We have received and reviewed all previous veterinarian records that GGA has been able to ascertain. I/We acknowledge this dog has been tested for heartworm disease, vaccinated for rabies and distemper/parvo, de-wormed, treated for fleas/ticks, and spayed/neutered. I/We are satisfied with the health disclosed on this dog. '];

  const A8 = form_data['I/We agree to keep all required vaccinations current, including but not limited to Rabies and Distemper/Parvo (DHPP) and ensure that the dog receives preventative medication against fleas, ticks and heartworm. This includes prompt response by a licensed veterinarian for any illness or injury. '];

  const A9 = form_data['I/We agree to follow the Going Home Protocol, guidelines and support provided to me by GGA to assist the transition of the dog to my home. This includes the use of an appropriately sized crate, appropriate leash length, and martingale collars for walking purposes.'];

  const A10 = form_data['If I/We can no longer keep this dog or provide it with good care I/we will return the dog to GGA by calling 647-280-9762 to make arrangements. I/We will never surrender this dog to a pound or shelter. I/We agree not to give away, sell, or trade my dog, even as a gift to a friend or family member. '];

  const A11 = form_data[`I/We will clearly tag and identify this dog and keep the dog clearly identified at all times with our contact information. I/We agree to keep the GGA "If I'm Alone I'm Lost" tag on this dog at all times. If the tag begins to show signs of wear, I/we will contact GGA for a replacement tag. `];

  const A12 = form_data['I/We will keep this dog as a house pet. When outside, I/we will always keep this dog on a leash or in a securely fenced yard which is at least four feet high. I/We will never use a Flexi-leash, tie out, pulley system or e-collar on the dog. '];

  const A13 = form_data['I/We will contact GGA immediately at 647-280-9762 if this dog becomes lost. '];

  const A14 = form_data['This dog will not be used for experimental purposes, animal research, dog fighting or use as a guard dog for any agency, corporation or organization. I/We will never allow any physical, mental, emotional or psychological abuse of this dog.'];

  const A15 = form_data['GGA may contact me to verify this dog’s welfare. I/We will provide any requested information and I/we will permit GGA to visit my home if so requested.'];

  const A16 = form_data['I/We understand that GGA makes no guarantees or warranties regarding the health or temperament of this dog. I/We understand GGA has provided me all the information on the health and temperament of this dog to the best of their knowledge and ability, and have made no misrepresentation concerning the health, condition, training, behavior or temperament of the dog. GGA shall not be held liable for the behavior of this dog or any damages it may cause once in my care.'];

  const A17 = form_data['I/We agree to release, indemnify and covenant to hold harmless GGA, its officers, members, agents and other representatives, from any claims damages, injuries, costs, or actions incurred as a result of this adoption or caused by the actions of the dog. '];

  const A18 = form_data['I/We understand that if I/we give false information or do not follow the terms of this contract, GGA may reclaim this dog, and may start legal proceedings against me at my expense.'];

  const A19 = form_data['I/We understand the adoption fee is used to cover the expenses of each dog in GGA, to cover medical care, transportation, preventatives, feeding, care and other costs while in foster care. I/We understand this adoption fee is not refundable. '];

  const A20 = form_data['I/We enter into this agreement of my/our own free will and understand that this is a binding contract enforceable by civil law.'];

  const A22 = form_data['I/We verify that I/We have read and fully understand and agree to the conditions of this contract. Please enter your names below. '];

  const A23 = form_data['I/We verify that I/We have read and fully understand and agree to the conditions of this contract, and accept the terms set out above. '];

  /******************************************************************************************************************************************************************
   * End of text modification section                                                                                                                               *
   *                                                                                                                                                                *
   ******************************************************************************************************************************************************************
   */

  /**
   * Make a copy of the target file that is located in Google Drive
   */
  const google_drive_contract_file_copy = google_drive_contract_file.makeCopy(adopters, google_drive_contract_folder);

  /**
   * Once a copy of the document has been created, fetch that document via the document id and open the document programmatically for text insertion
   */
  const contract_document = DocumentApp.openById(google_drive_contract_file_copy.getId());

  /**
   * Get the document body and footer to prep for modification
   */
  const contract_document_body = contract_document.getBody();
  const contract_document_footer = contract_document.getFooter();
  
  /**
   * Replacing all of the placeholder text in the document body with variable data
   */
  contract_document_body.replaceText('{{Adopters}}', adopters);
  contract_document_body.replaceText('{{Address}}', adopters_address);
  contract_document_body.replaceText('{{Telephone}}', adopters_phone_number);
  contract_document_body.replaceText('{{Email}}', adopters_email);
  contract_document_body.replaceText('{{A5}}', A5);
  contract_document_body.replaceText('{{A6}}', A6);
  contract_document_body.replaceText('{{A7}}', A7);
  contract_document_body.replaceText('{{A8}}', A8);
  contract_document_body.replaceText('{{A9}}', A9);
  contract_document_body.replaceText('{{A10}}', A10);
  contract_document_body.replaceText('{{A11}}', A11);
  contract_document_body.replaceText('{{A12}}', A12);
  contract_document_body.replaceText('{{A13}}', A13);
  contract_document_body.replaceText('{{A14}}', A14);
  contract_document_body.replaceText('{{A15}}', A15);
  contract_document_body.replaceText('{{A16}}', A16);
  contract_document_body.replaceText('{{A17}}', A17);
  contract_document_body.replaceText('{{A18}}', A18);
  contract_document_body.replaceText('{{A19}}', A19);
  contract_document_body.replaceText('{{A20}}', A20);
  contract_document_body.replaceText('{{Payment}}', payment);
  contract_document_body.replaceText('{{A22}}', A22)
  contract_document_body.replaceText('{{A23}}', A23);

  /**
   * Replacing all of the placeholder text in the document footer with variable data 
   */
  contract_document_footer.replaceText('{{Adopters}}', adopters);

  /**
   * ALWAYS remember to have the below function. The action of saving and closing the file will prevent memory leaks, random errors, corrupted files, and any unnecessary bottlenecks
   */
  contract_document.saveAndClose();
}