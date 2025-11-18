// Minimal BalanceChain SDK stub for local MiniBank demo
// In real deployment this will speak to BalanceChain backend.

window.BalanceChainSDK = (function(){
  const store = new Map();

  function pseudoIBAN(userId){
    const base = userId.replace(/[^0-9A-Za-z]/g,'').slice(-18);
    const padded = ('000000000000000000' + base).slice(-18);
    const chunks = padded.match(/.{1,4}/g) || [];
    return 'QA37 ' + chunks.join(' ');
  }

  return {
    async init(){
      return true;
    },
    async ensureIBAN(userId){
      if(!store.has(userId)){
        store.set(userId,{
          iban:pseudoIBAN(userId),
          bic:'QNBAQAQA'
        });
      }
      return store.get(userId);
    },
    async mirrorToMSL({userId,direction,amount,ref}){
      console.log('[BalanceChainSDK] mirrorToMSL', {userId,direction,amount,ref});
      return true;
    }
  };
})();