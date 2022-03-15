// Imports
// ========================================================
import { useCallback, useState } from 'react';
import { useConnect, useAccount, useNetwork, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';

// Styles
// ========================================================
/**
 * 
 */
const styles = {
  main: 'h-screen w-full flex justify-center items-center bg-slate-100',
  card: 'mx-4 max-w-xl w-full bg-white border border-slate-200 rounded-lg p-8 shadow-sm',
  h1: 'text-center mb-4 text-4xl font-semibold text-slate-800',
  p: 'text-center mb-8 text-slate-500',
  psmall: 'text-center mb-4 text-slate-500',
  button: 'h-12 mb-4 px-8 rounded-md w-full transition-all ease-in-out duration-200 font-[20px] font-medium flex justify-center items-center hover:shadow-xl hover:scale-105',
  errors: 'p-4 mb-4 text-sm rounded-lg border border-red-300 bg-red-200 text-red-600',
  pre: 'mb-4 bg-slate-200 p-4 rounded-lg overflow-scroll w-full'
}

/**
 * 
 * @param name 
 * @returns 
 */
const getButtonStyles = (name?: string) => {
  switch (name) {
    case 'MetaMask':
      return `disabled:bg-[rgba(245,132,21,1)] disabled:opacity-50 bg-[rgba(245,132,21,1)] text-white hover:bg-[#e87e14]`
    case 'WalletConnect':
      return `disabled:bg-[rgba(59,153,252,1)] disabled:opacity-50 bg-[rgba(59,153,252,1)] text-white hover:bg-[#3389e4]`
    case 'Coinbase Wallet':
      return `disabled:bg-[rgba(0,82,255,1)] disabled:opacity-50 bg-[rgba(0,82,255,1)] text-white hover:bg-[#0047e1]`
    default:
      return `disabled:hover:bg-slate-500 disabled:opacity-50 bg-slate-500 text-white hover:bg-slate-600`
  }
};

// Main Component
// ========================================================
const App = () => {
  // State / Props
  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount();
  const [{ data: networkData }] = useNetwork();
  const [state, setState] = useState<{
    address?: string
    error?: Error
    isLoading?: boolean
  }>({});
  const [message, setMessage] = useState<SiweMessage>();
  const [signature, setSignature] = useState<string | undefined>();
  const [me, setMe] = useState<unknown>()
  const [, signMessage] = useSignMessage();

  // Functions
  const signIn = useCallback(async () => {
    try {
      // Validation
      const address = accountData?.address;
      const chainId = networkData?.chain?.id;
      if (!address || !chainId) return;

      // Set loading
      setState({
        ...state,
        error: undefined,
        isLoading: true
      });

      // Retrieve nonce data
      const nonceResult = await fetch(`${import.meta.env.VITE_API_URL}/auth/nonce`, {
        method: 'get',
        credentials: 'include'
      });
      const nonceJson = await nonceResult.json();

      // Configure message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: nonceJson.data.nonce,
        issuedAt: nonceJson.data.issuedAt,
        expirationTime: nonceJson.data.expirationTime
      });

      setMessage(message);

      // Prompt for signature
      const signResult = await signMessage({ message: message.prepareMessage() });
      if (signResult.error) throw signResult.error;

      setSignature(signResult.data);

      // Verify signature
      await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature: signResult.data }),
        credentials: 'include'
      });

      // Reset loading state
      setState({
        ...state,
        isLoading: false
      });
    } catch (error) {
      setState({
        ...state,
        error: error as Error,
        isLoading: false
      });
    }
  }, []);

  /**
   * 
   */
  const retrieveMe = useCallback(async () => {
    // Set loading
    setState({
      ...state,
      error: undefined,
      isLoading: true
    });

    try {
      // Retrieve me
      const meResult = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      const meJson = await meResult.json();

      setMe(meJson);

      // Reset loading state
      setState({
        ...state,
        isLoading: false
      });
    } catch (error) {
      setState({
        ...state,
        error: error as Error,
        isLoading: false
      });
    }
  }, []);

  /**
   * 
   */
  const logOut = useCallback(async () => {
    // Set loading
    setState({
      ...state,
      error: undefined,
      isLoading: true
    });

    try {
      // Retrieve nonce data
      const logOutResult = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'get',
        credentials: 'include'
      });
      const logOutJSON = await logOutResult.json();

      // Reset loading state
      setState({
        ...state,
        isLoading: false
      });
    } catch (error) {
      setState({
        ...state,
        error: error as Error,
        isLoading: false
      });
    }
  }, []);

  // Render
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.h1}>Quick React TS SIWE</h1>
        <p className={styles.p}>See how to use SIWE with an API to generate access to a site.</p>

        {accountData
          ? <div>
            <p className={styles.psmall}><small>Connected With</small></p>
            <pre title={accountData?.address} className={styles.pre}>
              <code>{accountData?.address}</code>
            </pre>
            {state?.error ? <div className={styles.errors}>
              <span className="font-medium">Error!</span>
              <br />
              <span>
                {state?.error?.message ? `${state?.error?.message}.` : 'Unknown error.'}
              </span>
            </div> : null}
            <button onClick={() => {
              setMe(undefined);
              setMessage(undefined);
              setSignature(undefined);
              disconnect();
            }
            } className={`${styles.button} ${getButtonStyles()}`}>Disconnect</button>
            <button onClick={() => signIn()} className={`${styles.button} ${getButtonStyles()}`}>Sign In With Ethereum</button>
            <button onClick={() => retrieveMe()} className={`${styles.button} ${getButtonStyles()}`}>Retrieve User Information</button>
            <button onClick={() => {
              setMe(undefined);
              setMessage(undefined);
              setSignature(undefined);
              logOut();
            }} className={`${styles.button} ${getButtonStyles()}`}>Log Out</button>
            <hr className='mb-4' />
            <p className={styles.psmall}><small>Debug</small></p>
            <pre className={`${styles.pre} max-h-48 overflow-scroll`}>
              <code>{JSON.stringify({
                me,
                message,
                signature
              }, null, ' ')}</code>
            </pre>
          </div>
          : null}

        {!accountData ? <div>
          {connectors.map((option) => (
            <button
              title={`Connect Your Wallet With ${option.name}`}
              className={`${styles.button} ${getButtonStyles(option.name)}`}
              disabled={!option.ready}
              key={option.name}
              onClick={() => connect(option)}
            >
              {option.name}
              {!option.ready && ' (unsupported)'}
              {loading && option.name === connector?.name && <small className='ml-2'>(Awaiting Connetion...)</small>}
            </button>
          ))}

          {error ? <div className={styles.errors}>
            <span className="font-medium">Error!</span>
            <br />
            <span>
              {error?.message ? `${error?.message}.` : 'Unknown error.'}
            </span>
          </div> : null}
        </div> : null}
      </div>
    </main >
  );
};

// Exports
// ========================================================
export default App;
