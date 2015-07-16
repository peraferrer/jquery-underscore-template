/**
 * Created by german.peraferrer on 7/15/2015.
 */

(function($){
    var _jutTemplateCache = {};

    /**
     * Se encarga de recuperar el template
     *
     * @param id
     * @param data
     * @return {template|*}
     */
    var _getTemplate = function(id, data) {
        var template;

        // Recorremos todos los archivos importados
        _.each($(document).find('link[rel="import"]'), function (file, key) {
            // Buscamos dentro de los archivos imporatados el template requerido
            var _tmpl = $(file.import).find('script#'+id+'[type=text\\/html]')[0];

            if (_tmpl) {
                template = $(_tmpl).html();
                _jutTemplateCache[id] = template;
            }
        });

        return template;

    };

    /**
     * Carga template Underscore, los pre compila y lo cachea
     *
     * @param id ID del Template
     * @param data Objeto que será utilizado como dato dentro del template
     */
    $.fn.template = function(id, data) {

        // Todas deberán devolver un Deferred para que When pueda saber cuando funalizan
        var df = $.Deferred();

        // Intentamos cargar el tempalte cacheado
        var template = _jutTemplateCache[id];

        // Verificamos si el template se encuentre cacheado sino lo buscamos
        if (!template) {
            template = _getTemplate(id, data);
        }

        // Verificamos si se ha logrado recuperar el template
        if (template) {
            $(this).html( _.template(template)(data || {}));
            df.resolve(this);
        } else {
            df.reject(this);
        }

        // Devolvemos el Deferred para que When pueda conocer el estado de ejecución de la Función
        return df.promise();

    };

})(jQuery);