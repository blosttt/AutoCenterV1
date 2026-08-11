/* ==========================================================================
   AUTOCENTER AUTOMOTRIZ - INTERACTIVE LOGIC & PDF GENERATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // State
  let carDamageMarks = [];
  let budgetItems = [
    { concept: 'Mano de Obra (Desabolladura / Pintura / Mecánica)', val: 150000 },
    { concept: 'Repuestos / Insumos / Materiales', val: 85000 }
  ];

  // DOM Elements - Inputs
  const inpOtNumber = document.getElementById('inp-ot-number');
  const inpDocDate = document.getElementById('inp-doc-date');
  const lblOtNum = document.getElementById('lbl-ot-num');

  // 1. Taller
  const inpTallerRazon = document.getElementById('inp-taller-razon');
  const inpTallerRut = document.getElementById('inp-taller-rut');
  const inpTallerDireccion = document.getElementById('inp-taller-direccion');
  const inpTallerTelefono = document.getElementById('inp-taller-telefono');

  // 2. Cliente
  const inpClienteNombre = document.getElementById('inp-cliente-nombre');
  const inpClienteRut = document.getElementById('inp-cliente-rut');
  const inpClienteTelefono = document.getElementById('inp-cliente-telefono');
  const inpClienteCorreo = document.getElementById('inp-cliente-correo');

  // Vehiculo
  const inpVehMarca = document.getElementById('inp-veh-marca');
  const inpVehModelo = document.getElementById('inp-veh-modelo');
  const inpVehAnio = document.getElementById('inp-veh-anio');
  const inpVehPatente = document.getElementById('inp-veh-patente');
  const inpVehKm = document.getElementById('inp-veh-km');

  // 3. Motivo
  const chkMotivoDesabolladura = document.getElementById('chk-motivo-desabolladura');
  const chkMotivoSiniestro = document.getElementById('chk-motivo-siniestro');
  const chkMotivoMantencion = document.getElementById('chk-motivo-mantencion');
  const chkMotivoElectrica = document.getElementById('chk-motivo-electrica');
  const inpMotivoDescripcion = document.getElementById('inp-motivo-descripcion');

  // 4. Inventario
  const chkInvLlave = document.getElementById('chk-inv-llave');
  const chkInvRadio = document.getElementById('chk-inv-radio');
  const chkInvRepuesto = document.getElementById('chk-inv-repuesto');
  const chkInvAntena = document.getElementById('chk-inv-antena');
  const chkInvDocumentos = document.getElementById('chk-inv-documentos');
  const chkInvTapa = document.getElementById('chk-inv-tapa');
  const inpInvTapaCant = document.getElementById('inp-inv-tapa-cant');
  const inpObsEsteticas = document.getElementById('inp-obs-esteticas');

  // 5. Obs Generales
  const inpObsGenerales = document.getElementById('inp-obs-generales');

  // 6. Presupuesto
  const budgetTbody = document.getElementById('budget-items-tbody');
  const btnAddBudgetRow = document.getElementById('btn-add-budget-row');
  const chkAplicarIva = document.getElementById('chk-aplicar-iva');
  const calcSubtotalEl = document.getElementById('calc-subtotal');
  const calcIvaEl = document.getElementById('calc-iva');
  const calcTotalEl = document.getElementById('calc-total');

  // 7. Términos & Firmas
  const inpTermsText = document.getElementById('inp-terms-text');
  const inpSigClientRut = document.getElementById('inp-sig-client-rut');
  const inpSigTallerResp = document.getElementById('inp-sig-taller-resp');

  // DOM Elements - Document Paper Views
  const viewOtNumber = document.getElementById('view-ot-number');
  const viewDocDate = document.getElementById('view-doc-date');
  const viewTallerRazon = document.getElementById('view-taller-razon');
  const viewTallerRut = document.getElementById('view-taller-rut');
  const viewTallerDireccion = document.getElementById('view-taller-direccion');
  const viewTallerTelefono = document.getElementById('view-taller-telefono');

  const viewClienteNombre = document.getElementById('view-cliente-nombre');
  const viewClienteRut = document.getElementById('view-cliente-rut');
  const viewClienteTelefono = document.getElementById('view-cliente-telefono');
  const viewClienteCorreo = document.getElementById('view-cliente-correo');

  const viewVehMarca = document.getElementById('view-veh-marca');
  const viewVehModelo = document.getElementById('view-veh-modelo');
  const viewVehAnio = document.getElementById('view-veh-anio');
  const viewVehPatente = document.getElementById('view-veh-patente');
  const viewVehKm = document.getElementById('view-veh-km');

  const vchkMotivoDesabolladura = document.getElementById('vchk-motivo-desabolladura');
  const vchkMotivoSiniestro = document.getElementById('vchk-motivo-siniestro');
  const vchkMotivoMantencion = document.getElementById('vchk-motivo-mantencion');
  const vchkMotivoElectrica = document.getElementById('vchk-motivo-electrica');
  const viewMotivoDescripcion = document.getElementById('view-motivo-descripcion');

  const vchkInvLlave = document.getElementById('vchk-inv-llave');
  const vchkInvRadio = document.getElementById('vchk-inv-radio');
  const vchkInvRepuesto = document.getElementById('vchk-inv-repuesto');
  const vchkInvAntena = document.getElementById('vchk-inv-antena');
  const vchkInvDocumentos = document.getElementById('vchk-inv-documentos');
  const vchkInvTapa = document.getElementById('vchk-inv-tapa');
  const viewInvTapaCant = document.getElementById('view-inv-tapa-cant');
  const viewObsEsteticas = document.getElementById('view-obs-esteticas');
  const viewObsGenerales = document.getElementById('view-obs-generales');

  const viewBudgetTbody = document.getElementById('view-budget-tbody');
  const viewCalcSubtotal = document.getElementById('view-calc-subtotal');
  const viewCalcIva = document.getElementById('view-calc-iva');
  const viewCalcTotal = document.getElementById('view-calc-total');
  const viewRowIva = document.getElementById('view-row-iva');

  const viewTermsList = document.getElementById('view-terms-list');
  const viewSigClientRut = document.getElementById('view-sig-client-rut');
  const viewSigTallerResp = document.getElementById('view-sig-taller-resp');

  // Car SVG Canvas
  const carSvgCanvas = document.getElementById('car-svg-canvas');
  const svgMarksLayer = document.getElementById('svg-marks-layer');
  const docCarSvgCopy = document.getElementById('doc-car-svg-copy');
  const btnClearCarMarks = document.getElementById('btn-clear-car-marks');

  // Action Buttons
  const btnNewOrder = document.getElementById('btn-new-order');
  const btnSaveDraft = document.getElementById('btn-save-draft');
  const btnLoadDrafts = document.getElementById('btn-load-drafts');
  const btnPrint = document.getElementById('btn-print');
  const btnExportPdf = document.getElementById('btn-export-pdf');
  const btnSaveTallerDefaults = document.getElementById('btn-save-taller-defaults');

  // Modal
  const modalHistory = document.getElementById('modal-history');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const historyListContainer = document.getElementById('history-list-container');

  /* ==========================================================================
     INITIALIZATION & DEFAULTS
     ========================================================================== */
  function init() {
    // Set default date to today
    const todayStr = new Date().toISOString().split('T')[0];
    inpDocDate.value = todayStr;

    // Load Taller Defaults if saved
    const savedTaller = localStorage.getItem('autocenter_taller_defaults');
    if (savedTaller) {
      try {
        const data = JSON.parse(savedTaller);
        inpTallerRazon.value = data.razon || inpTallerRazon.value;
        inpTallerRut.value = data.rut || inpTallerRut.value;
        inpTallerDireccion.value = data.direccion || inpTallerDireccion.value;
        inpTallerTelefono.value = data.telefono || inpTallerTelefono.value;
      } catch(e) {}
    }

    // Setup Budget Table
    renderBudgetEditor();

    // Initial Sync with Document Paper
    syncAllToDocument();

    // Event Listeners for Live Updates
    bindInputEvents();
  }

  /* ==========================================================================
     LIVE SYNC FUNCTION
     ========================================================================== */
  function syncAllToDocument() {
    // OT & Date
    const otVal = inpOtNumber.value.trim() || 'OT-2026-001';
    lblOtNum.textContent = otVal;
    viewOtNumber.textContent = otVal;

    // Format Date
    if (inpDocDate.value) {
      const parts = inpDocDate.value.split('-');
      if (parts.length === 3) {
        viewDocDate.textContent = `${parts[2]}/${parts[1]}/${parts[0]}`;
      } else {
        viewDocDate.textContent = inpDocDate.value;
      }
    } else {
      viewDocDate.textContent = '-';
    }

    // 1. Taller
    viewTallerRazon.textContent = inpTallerRazon.value || '-';
    viewTallerRut.textContent = inpTallerRut.value || '-';
    viewTallerDireccion.textContent = inpTallerDireccion.value || '-';
    viewTallerTelefono.textContent = inpTallerTelefono.value || '-';

    // 2. Cliente
    viewClienteNombre.textContent = inpClienteNombre.value || '-';
    viewClienteRut.textContent = inpClienteRut.value || '-';
    viewClienteTelefono.textContent = inpClienteTelefono.value || '-';
    viewClienteCorreo.textContent = inpClienteCorreo.value || '-';

    // Vehiculo
    viewVehMarca.textContent = inpVehMarca.value || '-';
    viewVehModelo.textContent = inpVehModelo.value || '-';
    viewVehAnio.textContent = inpVehAnio.value || '-';
    viewVehPatente.textContent = (inpVehPatente.value || '-').toUpperCase();
    viewVehKm.textContent = inpVehKm.value || '-';

    // 3. Motivo Checkboxes
    updateSquareCheck(vchkMotivoDesabolladura, chkMotivoDesabolladura.checked);
    updateSquareCheck(vchkMotivoSiniestro, chkMotivoSiniestro.checked);
    updateSquareCheck(vchkMotivoMantencion, chkMotivoMantencion.checked);
    updateSquareCheck(vchkMotivoElectrica, chkMotivoElectrica.checked);
    viewMotivoDescripcion.textContent = inpMotivoDescripcion.value || 'Sin detalles especificados.';

    // 4. Inventario Checkboxes
    updateSquareCheck(vchkInvLlave, chkInvLlave.checked);
    updateSquareCheck(vchkInvRadio, chkInvRadio.checked);
    updateSquareCheck(vchkInvRepuesto, chkInvRepuesto.checked);
    updateSquareCheck(vchkInvAntena, chkInvAntena.checked);
    updateSquareCheck(vchkInvDocumentos, chkInvDocumentos.checked);
    updateSquareCheck(vchkInvTapa, chkInvTapa.checked);
    viewInvTapaCant.textContent = inpInvTapaCant.value || '_';

    // Fuel Level
    const selectedFuel = document.querySelector('input[name="fuel_level"]:checked');
    const fuelVal = selectedFuel ? selectedFuel.value : '1/2';
    
    document.getElementById('vrf-vacio').classList.toggle('checked', fuelVal === 'Vacío (E)');
    document.getElementById('vrf-14').classList.toggle('checked', fuelVal === '1/4');
    document.getElementById('vrf-12').classList.toggle('checked', fuelVal === '1/2');
    document.getElementById('vrf-34').classList.toggle('checked', fuelVal === '3/4');
    document.getElementById('vrf-lleno').classList.toggle('checked', fuelVal === 'Lleno (F)');

    // Obs Esteticas
    viewObsEsteticas.textContent = inpObsEsteticas.value || 'Sin observaciones estéticas previas.';

    // 5. Obs Generales
    viewObsGenerales.textContent = inpObsGenerales.value || 'Sin notas adicionales.';

    // 6. Presupuesto Calculation & Render
    renderBudgetDocument();

    // 7. Terms & Conditions
    renderTermsDocument();

    // Signature Subtexts
    viewSigClientRut.textContent = inpSigClientRut.value ? `RUT: ${inpSigClientRut.value}` : 'RUT: ___________________________';
    viewSigTallerResp.textContent = inpSigTallerResp.value ? inpSigTallerResp.value : 'AUTOCENTER AUTOMOTRIZ';

    // Copy Car SVG to document
    renderCarSvgCopy();
  }

  function updateSquareCheck(elem, isChecked) {
    if (elem) {
      if (isChecked) {
        elem.classList.add('checked');
      } else {
        elem.classList.remove('checked');
      }
    }
  }

  /* ==========================================================================
     INPUT EVENT BINDINGS
     ========================================================================== */
  function bindInputEvents() {
    const inputs = [
      inpOtNumber, inpDocDate, inpTallerRazon, inpTallerRut, inpTallerDireccion, inpTallerTelefono,
      inpClienteNombre, inpClienteRut, inpClienteTelefono, inpClienteCorreo,
      inpVehMarca, inpVehModelo, inpVehAnio, inpVehPatente, inpVehKm,
      inpMotivoDescripcion, inpInvTapaCant, inpObsEsteticas, inpObsGenerales,
      inpTermsText, inpSigClientRut, inpSigTallerResp
    ];

    inputs.forEach(input => {
      if (input) {
        input.addEventListener('input', syncAllToDocument);
      }
    });

    const checkboxes = [
      chkMotivoDesabolladura, chkMotivoSiniestro, chkMotivoMantencion, chkMotivoElectrica,
      chkInvLlave, chkInvRadio, chkInvRepuesto, chkInvAntena, chkInvDocumentos, chkInvTapa,
      chkAplicarIva
    ];

    checkboxes.forEach(chk => {
      if (chk) {
        chk.addEventListener('change', syncAllToDocument);
      }
    });

    const fuelRadios = document.querySelectorAll('input[name="fuel_level"]');
    fuelRadios.forEach(radio => {
      radio.addEventListener('change', syncAllToDocument);
    });
  }

  /* ==========================================================================
     BUDGET EDITOR & CALCULATION LOGIC
     ========================================================================== */
  function renderBudgetEditor() {
    budgetTbody.innerHTML = '';
    budgetItems.forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="text" class="inp-budget-concept" data-index="${index}" value="${escapeHtml(item.concept)}"></td>
        <td><input type="number" class="inp-budget-val" data-index="${index}" value="${item.val}" placeholder="0"></td>
        <td><button type="button" class="btn-icon-del btn-del-row" data-index="${index}"><i class="fa-solid fa-trash"></i></button></td>
      `;
      budgetTbody.appendChild(tr);
    });

    // Re-bind row events
    document.querySelectorAll('.inp-budget-concept').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        budgetItems[idx].concept = e.target.value;
        syncAllToDocument();
      });
    });

    document.querySelectorAll('.inp-budget-val').forEach(inp => {
      inp.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        budgetItems[idx].val = parseFloat(e.target.value) || 0;
        syncAllToDocument();
      });
    });

    document.querySelectorAll('.btn-del-row').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        budgetItems.splice(idx, 1);
        renderBudgetEditor();
        syncAllToDocument();
      });
    });
  }

  btnAddBudgetRow.addEventListener('click', () => {
    budgetItems.push({ concept: 'Nuevo servicio / repuesto', val: 0 });
    renderBudgetEditor();
    syncAllToDocument();
  });

  function renderBudgetDocument() {
    viewBudgetTbody.innerHTML = '';
    let subtotal = 0;

    budgetItems.forEach(item => {
      const valNum = parseFloat(item.val) || 0;
      subtotal += valNum;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${escapeHtml(item.concept || 'Item')}</td>
        <td class="val-right">$${formatMoney(valNum)}</td>
      `;
      viewBudgetTbody.appendChild(tr);
    });

    const applyIva = chkAplicarIva.checked;
    const ivaVal = applyIva ? Math.round(subtotal * 0.19) : 0;
    const totalVal = subtotal + ivaVal;

    calcSubtotalEl.textContent = `$${formatMoney(subtotal)}`;
    calcIvaEl.textContent = `$${formatMoney(ivaVal)}`;
    calcTotalEl.textContent = `$${formatMoney(totalVal)}`;

    viewCalcSubtotal.textContent = `$${formatMoney(subtotal)}`;
    viewCalcIva.textContent = `$${formatMoney(ivaVal)}`;
    viewCalcTotal.textContent = `$${formatMoney(totalVal)}`;

    if (applyIva) {
      viewRowIva.style.display = 'table-row';
    } else {
      viewRowIva.style.display = 'none';
    }
  }

  function formatMoney(amount) {
    return new Intl.NumberFormat('es-CL').format(amount);
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  /* ==========================================================================
     TERMS & CONDITIONS RENDERER
     ========================================================================== */
  function renderTermsDocument() {
    viewTermsList.innerHTML = '';
    const text = inpTermsText.value.trim();
    if (!text) return;

    const lines = text.split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        const div = document.createElement('div');
        div.className = 'doc-terms-item';
        div.textContent = line.trim();
        viewTermsList.appendChild(div);
      }
    });
  }

  /* ==========================================================================
     INTERACTIVE CAR DAMAGE INSPECTOR (SVG PINS)
     ========================================================================== */
  carSvgCanvas.addEventListener('click', (e) => {
    const rect = carSvgCanvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 600;
    const y = ((e.clientY - rect.top) / rect.height) * 220;

    carDamageMarks.push({ x: Math.round(x), y: Math.round(y) });
    renderCarMarks();
    syncAllToDocument();
  });

  btnClearCarMarks.addEventListener('click', () => {
    carDamageMarks = [];
    renderCarMarks();
    syncAllToDocument();
  });

  function renderCarMarks() {
    svgMarksLayer.innerHTML = '';
    carDamageMarks.forEach((mark, i) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', mark.x);
      circle.setAttribute('cy', mark.y);
      circle.setAttribute('r', '8');
      circle.setAttribute('fill', '#ef4444');
      circle.setAttribute('stroke', '#ffffff');
      circle.setAttribute('stroke-width', '2');

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', mark.x);
      text.setAttribute('y', mark.y + 3);
      text.setAttribute('font-size', '9');
      text.setAttribute('font-weight', 'bold');
      text.setAttribute('fill', '#ffffff');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = i + 1;

      g.appendChild(circle);
      g.appendChild(text);
      svgMarksLayer.appendChild(g);
    });
  }

  function renderCarSvgCopy() {
    docCarSvgCopy.innerHTML = carSvgCanvas.outerHTML;
  }

  /* ==========================================================================
     SAVE TALLER DEFAULTS & PERSISTENCE
     ========================================================================== */
  btnSaveTallerDefaults.addEventListener('click', () => {
    const defaults = {
      razon: inpTallerRazon.value,
      rut: inpTallerRut.value,
      direccion: inpTallerDireccion.value,
      telefono: inpTallerTelefono.value
    };
    localStorage.setItem('autocenter_taller_defaults', JSON.stringify(defaults));
    alert('¡Datos del taller guardados como predeterminados con éxito!');
  });

  // Save Draft Order to LocalStorage
  btnSaveDraft.addEventListener('click', () => {
    const otNumber = inpOtNumber.value.trim() || 'OT-UNNAMED';
    const draftData = {
      id: Date.now(),
      otNumber: otNumber,
      date: inpDocDate.value,
      clientName: inpClienteNombre.value,
      clientRut: inpClienteRut.value,
      clientPhone: inpClienteTelefono.value,
      clientEmail: inpClienteCorreo.value,
      vehMarca: inpVehMarca.value,
      vehModelo: inpVehModelo.value,
      vehAnio: inpVehAnio.value,
      vehPatente: inpVehPatente.value,
      vehKm: inpVehKm.value,
      motivoDesabolladura: chkMotivoDesabolladura.checked,
      motivoSiniestro: chkMotivoSiniestro.checked,
      motivoMantencion: chkMotivoMantencion.checked,
      motivoElectrica: chkMotivoElectrica.checked,
      motivoDesc: inpMotivoDescripcion.value,
      invLlave: chkInvLlave.checked,
      invRadio: chkInvRadio.checked,
      invRepuesto: chkInvRepuesto.checked,
      invAntena: chkInvAntena.checked,
      invDocumentos: chkInvDocumentos.checked,
      invTapa: chkInvTapa.checked,
      invTapaCant: inpInvTapaCant.value,
      fuelLevel: document.querySelector('input[name="fuel_level"]:checked')?.value || '1/2',
      obsEsteticas: inpObsEsteticas.value,
      obsGenerales: inpObsGenerales.value,
      budgetItems: budgetItems,
      aplicarIva: chkAplicarIva.checked,
      termsText: inpTermsText.value,
      sigClientRut: inpSigClientRut.value,
      sigTallerResp: inpSigTallerResp.value,
      carDamageMarks: carDamageMarks
    };

    let history = JSON.parse(localStorage.getItem('autocenter_history') || '[]');
    const existingIndex = history.findIndex(item => item.otNumber === otNumber);
    if (existingIndex >= 0) {
      history[existingIndex] = draftData;
    } else {
      history.unshift(draftData);
    }

    localStorage.setItem('autocenter_history', JSON.stringify(history));
    alert(`Borrador ${otNumber} guardado correctamente.`);
  });

  // Open Load History Modal
  btnLoadDrafts.addEventListener('click', () => {
    renderHistoryList();
    modalHistory.style.display = 'flex';
  });

  btnCloseModal.addEventListener('click', () => {
    modalHistory.style.display = 'none';
  });

  function renderHistoryList() {
    const history = JSON.parse(localStorage.getItem('autocenter_history') || '[]');
    historyListContainer.innerHTML = '';

    if (history.length === 0) {
      historyListContainer.innerHTML = '<p class="empty-msg">No hay órdenes guardadas en el historial local.</p>';
      return;
    }

    history.forEach(item => {
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <div>
          <h4>${escapeHtml(item.otNumber)} - ${escapeHtml(item.clientName || 'Sin Cliente')}</h4>
          <p><i class="fa-solid fa-car"></i> ${escapeHtml(item.vehMarca || '')} ${escapeHtml(item.vehModelo || '')} (${escapeHtml(item.vehPatente || 'S/P')}) | Fecha: ${item.date || '-'}</p>
        </div>
        <div class="history-actions">
          <button class="btn-sm btn-primary btn-load-item" data-id="${item.id}"><i class="fa-solid fa-folder-open"></i> Cargar</button>
          <button class="btn-sm btn-subtle btn-del-item" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
      historyListContainer.appendChild(div);
    });

    document.querySelectorAll('.btn-load-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        loadDraftById(id);
        modalHistory.style.display = 'none';
      });
    });

    document.querySelectorAll('.btn-del-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-id'));
        let history = JSON.parse(localStorage.getItem('autocenter_history') || '[]');
        history = history.filter(item => item.id !== id);
        localStorage.setItem('autocenter_history', JSON.stringify(history));
        renderHistoryList();
      });
    });
  }

  function loadDraftById(id) {
    const history = JSON.parse(localStorage.getItem('autocenter_history') || '[]');
    const draft = history.find(item => item.id === id);
    if (!draft) return;

    inpOtNumber.value = draft.otNumber || 'OT-001';
    inpDocDate.value = draft.date || '';
    inpClienteNombre.value = draft.clientName || '';
    inpClienteRut.value = draft.clientRut || '';
    inpClienteTelefono.value = draft.clientPhone || '';
    inpClienteCorreo.value = draft.clientEmail || '';

    inpVehMarca.value = draft.vehMarca || '';
    inpVehModelo.value = draft.vehModelo || '';
    inpVehAnio.value = draft.vehAnio || '';
    inpVehPatente.value = draft.vehPatente || '';
    inpVehKm.value = draft.vehKm || '';

    chkMotivoDesabolladura.checked = !!draft.motivoDesabolladura;
    chkMotivoSiniestro.checked = !!draft.motivoSiniestro;
    chkMotivoMantencion.checked = !!draft.motivoMantencion;
    chkMotivoElectrica.checked = !!draft.motivoElectrica;
    inpMotivoDescripcion.value = draft.motivoDesc || '';

    chkInvLlave.checked = !!draft.invLlave;
    chkInvRadio.checked = !!draft.invRadio;
    chkInvRepuesto.checked = !!draft.invRepuesto;
    chkInvAntena.checked = !!draft.invAntena;
    chkInvDocumentos.checked = !!draft.invDocumentos;
    chkInvTapa.checked = !!draft.invTapa;
    inpInvTapaCant.value = draft.invTapaCant || '';

    if (draft.fuelLevel) {
      const radio = document.querySelector(`input[name="fuel_level"][value="${draft.fuelLevel}"]`);
      if (radio) radio.checked = true;
    }

    inpObsEsteticas.value = draft.obsEsteticas || '';
    inpObsGenerales.value = draft.obsGenerales || '';

    if (Array.isArray(draft.budgetItems)) {
      budgetItems = draft.budgetItems;
      renderBudgetEditor();
    }

    chkAplicarIva.checked = draft.aplicarIva !== false;
    inpTermsText.value = draft.termsText || '';
    inpSigClientRut.value = draft.sigClientRut || '';
    inpSigTallerResp.value = draft.sigTallerResp || '';

    if (Array.isArray(draft.carDamageMarks)) {
      carDamageMarks = draft.carDamageMarks;
      renderCarMarks();
    }

    syncAllToDocument();
  }

  // Reset / New Order
  btnNewOrder.addEventListener('click', () => {
    if (confirm('¿Desea crear una nueva orden de trabajo? Se limpiarán los campos actuales.')) {
      const nextNum = Math.floor(Math.random() * 900) + 100;
      inpOtNumber.value = `OT-2026-${nextNum}`;
      inpClienteNombre.value = '';
      inpClienteRut.value = '';
      inpClienteTelefono.value = '';
      inpClienteCorreo.value = '';
      inpVehMarca.value = '';
      inpVehModelo.value = '';
      inpVehAnio.value = '';
      inpVehPatente.value = '';
      inpVehKm.value = '';
      inpMotivoDescripcion.value = '';
      inpObsEsteticas.value = '';
      inpObsGenerales.value = '';
      
      carDamageMarks = [];
      renderCarMarks();

      budgetItems = [
        { concept: 'Mano de Obra (Desabolladura / Pintura / Mecánica)', val: 0 },
        { concept: 'Repuestos / Insumos / Materiales', val: 0 }
      ];
      renderBudgetEditor();

      syncAllToDocument();
    }
  });

  /* ==========================================================================
     PRINTING & PDF EXPORT
     ========================================================================== */
  btnPrint.addEventListener('click', () => {
    window.print();
  });

  btnExportPdf.addEventListener('click', () => {
    const element = document.getElementById('document-paper');
    const otName = inpOtNumber.value.trim() || 'OT-ORDEN';
    
    // Config options for html2pdf
    const opt = {
      margin:       [5, 5, 5, 5],
      filename:     `ORDEN_TRABAJO_${otName}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    btnExportPdf.disabled = true;
    btnExportPdf.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generando PDF...';

    html2pdf().set(opt).from(element).save().then(() => {
      btnExportPdf.disabled = false;
      btnExportPdf.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Exportar PDF';
    }).catch(err => {
      console.error(err);
      btnExportPdf.disabled = false;
      btnExportPdf.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Exportar PDF';
      alert('Se generó una advertencia al exportar PDF, probando impresión directa.');
      window.print();
    });
  });

  // RUN INITIALIZATION
  init();

});
