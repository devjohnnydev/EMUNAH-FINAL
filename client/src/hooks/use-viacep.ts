import { useState } from "react";

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  erro?: boolean;
}

interface AddressData {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  stateCode: string;
}

export function useViaCep() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCep = (cep: string): string => {
    return cep.replace(/\D/g, "");
  };

  const isValidCep = (cep: string): boolean => {
    const cleanCep = formatCep(cep);
    return cleanCep.length === 8;
  };

  const fetchAddress = async (cep: string): Promise<AddressData | null> => {
    const cleanCep = formatCep(cep);
    
    if (!isValidCep(cleanCep)) {
      setError("CEP inválido. Digite 8 números.");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      
      if (!response.ok) {
        throw new Error("Erro ao consultar CEP");
      }

      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        setError("CEP não encontrado.");
        return null;
      }

      return {
        street: data.logradouro || "",
        neighborhood: data.bairro || "",
        city: data.localidade || "",
        state: data.estado || "",
        stateCode: data.uf || "",
      };
    } catch (err) {
      setError("Erro ao buscar endereço. Tente novamente.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchAddress,
    isLoading,
    error,
    formatCep,
    isValidCep,
  };
}
