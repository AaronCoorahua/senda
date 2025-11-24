
import React from 'react';
import { Career } from '@/data/careers';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scale, X, Sparkles } from 'lucide-react';

interface ComparisonBarProps {
  selectedCareers: Career[];
  onCompare: () => void;
  onRemove: (careerId: string) => void;
  compareEnabled: boolean;
}

const ComparisonBar: React.FC<ComparisonBarProps> = ({
  selectedCareers,
  onCompare,
  onRemove,
  compareEnabled
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-senda-primary/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Scale className="w-6 h-6 text-senda-primary" />
              <h3 className="text-lg font-montserrat font-bold text-senda-primary">
                Comparar Carreras
              </h3>
              <Badge className="bg-senda-primary/10 text-senda-primary border-senda-primary/20">
                {selectedCareers.length}/3
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 max-w-2xl">
              {selectedCareers.map((career) => (
                <Badge
                  key={career.id}
                  className="bg-senda-cream text-senda-primary border border-senda-primary/30 px-3 py-2 rounded-full flex items-center space-x-2 hover:bg-senda-primary/10 transition-colors"
                >
                  <span className="font-medium">{career.name}</span>
                  <button
                    onClick={() => onRemove(career.id)}
                    className="ml-2 hover:bg-red-100 rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {!compareEnabled && (
              <p className="text-sm text-gray-500 font-lato">
                Selecciona al menos 2 carreras para comparar
              </p>
            )}
            
            <Button
              onClick={onCompare}
              disabled={!compareEnabled}
              className={`
                px-8 py-3 rounded-2xl font-montserrat font-bold text-lg transition-all duration-300 
                ${compareEnabled 
                  ? 'bg-gradient-to-r from-senda-primary to-senda-secondary hover:from-senda-secondary hover:to-senda-primary text-white shadow-lg hover:shadow-xl hover:scale-105' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <Scale className="w-5 h-5 mr-2" />
              Comparar carreras
              {compareEnabled && <Sparkles className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;
