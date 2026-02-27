(function (global) {
  const NetCure = {
    sanitize(text) {
      return String(text).replace(/[<>]/g, '');
    },
    scoreIntent(query) {
      const q = query.toLowerCase();
      if (q.includes('porta')) return 'portabilidad';
      if (q.includes('recarga')) return 'recargas';
      if (q.includes('equipo')) return 'equipos';
      return 'planes';
    },
    formatMoney(value) {
      return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
    }
  };
  global.NetCure = NetCure;
})(window);
