function bytesToSize(bytes) {
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

   if (!bytes) {
      return '0 Byte';
   }

   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

   return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

export function upload(selector, options = {}) {
   const input = document.querySelector(selector);
   const preview = document.createElement('div');

   preview.classList.add('preview');

   const btnOpen = document.createElement('button');
   btnOpen.classList.add('btn');
   btnOpen.textContent = 'Open';

   if (options.multi) {
      input.setAttribute('multiple', true);
   }

   if (options.accept && Array.isArray(options.accept)) {
      input.setAttribute('accept', options.accept.join(','));
   }

   input.insertAdjacentElement('afterend', btnOpen);
   input.insertAdjacentElement('afterend', preview);

   const triggerInput = () => input.click();
   const changeHandler = event => {
      if (!event.target.files.length) {
         return;
      }

      const files = Array.from(event.target.files);

      preview.innerHTML = '';

      files.forEach(file => {
         if (!file.type.match('image')) {
            return;
         }

         const reader = new FileReader();

         reader.onload = e => {
            const src = e.target.result;

            preview.insertAdjacentHTML('afterbegin', `
               <div class="preview-img">
                  <div class="preview-remove">&times;</div>
                  <img src="${src}" alt="${file.name}" />
                  <div class="preview-info">
                     <span>${file.name}</span>
                     <span>${bytesToSize(file.size)}</span>
                  </div>
               </div>
            `);
         };

         reader.readAsDataURL(file);
      });
   };

   btnOpen.addEventListener('click', triggerInput);
   input.addEventListener('change', changeHandler);
}