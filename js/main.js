

function hash_text(text){
    const myPassword = cipher('morganamx')
     return myPassword(text)
}

const close_modal_mgn = (id) => {
    const modal_mgn = document.getElementById(id);  
    modal_mgn.style.display = 'none';
}

const open_modal_mgn = (id) => {
    const modal_mgn = document.getElementById(id);
    modal_mgn.style.display = 'flex'
}

const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
}
    


let params_building = {
    qr_prop_value: '2000000',
    qr_down_payment: '200000',
    qr_term: '20',
    qr_location: '9',
    currency: 'MXN',
    qr_lnk_property: 'file:///Users/paulocesarorozcoguerrero/Desktop/DOCS_LOLA/lola_ssb%202/index.html',
    propertyType: '2',
    auction: false,
    /*prospect_name: 'cesar',
    prospect_last_name: 'oroo',
    prospect_email: 'alber_test+uat@hotmail.com',
    prospect_phone: '8475498434',*/
    username:'c93a7dd502af427599f6f114cbe32336',
}
// DATOS QUE SE PIDE A TOKKO PARA PODER HACER LA VINCULACION DEL PROSPECTO CON EL CLIENTE 
    //agent_name: 'cesar',       
    //agent_last_name: 'orozco', 
    //agent_email: 'paulo+tokko+quote@morgana.mx',  
    //agent_phone: '5698340934',  
    //tokkoId: '561604',     -- DATOS SOLO PARA TOKKO            
    //qr_prop_tokko_id: '802k394kje02k',  -- DATOS SOLO PARA TOKKO      
    //name: 'cesar_building',   

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const return_params_building = data => {
    let {
        username, qr_prop_value, qr_down_payment, qr_location, currency, name, qr_lnk_property, propertyType, auction, tokkoId,
        qr_prop_tokko_id, agent_name, agent_last_name, agent_email, agent_phone, prospect_name, prospect_last_name,
        prospect_email, prospect_phone, qr_term,
    } = data;
    const cipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0)), byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return text => text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
    }
    function hash_text(text) { const myPassword = cipher('morganamx'); return myPassword(text) }
    let params = `
        ${qr_prop_value ? `&qr_prop_value=${qr_prop_value}` : ''}
        ${qr_down_payment ? `&qr_down_payment=${qr_down_payment}` : ''}
        ${qr_term ? `&qr_term=${qr_term}` : ''}
        ${qr_location ? `&qr_location=${qr_location}` : ''}
        ${currency ? `&currency=${currency}` : ''}
        ${qr_lnk_property ? `&qr_lnk_property=${qr_lnk_property}` : ''}
        ${propertyType ? `&propertyType=${propertyType}` : ''}
        ${auction ? `&auction=${auction}` : ''}
        ${tokkoId ? `&tokkoId=${tokkoId}` : ''}
        ${qr_prop_tokko_id ? `&qr_prop_tokko_id=${qr_prop_tokko_id}` : ''}
        ${name ? `&name=${name}` : ''}
        ${username ? `&username=${username}` : ''}
        ${agent_name ? `&agent_name=${agent_name}` : ''}
        ${agent_last_name ? `&agent_last_name=${agent_last_name}` : ''}
        ${agent_email ? `&agent_email=${agent_email}` : ''}
        ${agent_phone ? `&agent_phone=${agent_phone}` : ''}
        ${prospect_name ? `&prospect_name=${prospect_name}` : ''}
        ${prospect_last_name ? `&prospect_last_name=${prospect_last_name}` : ''}
        ${prospect_email ? `&prospect_email=${prospect_email}` : ''}
        ${prospect_phone ? `&prospect_phone=${prospect_phone}` : ''}
    `;
    params = hash_text(params);

    return `http://morgana.localhost:8003/lola/registra_cotiza/${params.length > 0 ? `?${params}` : ''}`
}




const put_params_bulding = (data) => {
    
    let div_ifrm = document.getElementById('id_fiv_frm_mgn');
    
    div_ifrm.classList.remove('d-none');
    // El código se está ejecutando en un dispositivo de escritorio

    if (/Mobile/i.test(navigator.userAgent)) {
      window.open(return_params_building(params_building), '_blank');
    }else{
        div_ifrm.innerHTML = `
            <div class="d-flex justify-content-end pb-2 " id="id_container_close">
                <img src="./img/ICONO_CLOSE.svg" class="cursor-pointer" onclick="close_modal_mgn('id_fiv_frm_mgn')">
            </div>
            <iframe class="" src="${return_params_building(params_building)}" id="id_ifm_mgn" width="800" height="600"></iframe>
        `
    }    
}

function init_lola_mudi(){
    let id_frame = document.getElementById('id_space_sb');
    id_frame.innerHTML += `
    <iframe class="" src="${return_params_building(params_building)}" id="id_ifm_mgn" width="770" height="600"></iframe>
    `
}



