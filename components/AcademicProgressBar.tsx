
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { BookOpen, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AcademicBlock {
  range: string;
  name: string;
  description: string;
  content: string;
}

interface AcademicProgressBarProps {
  academicTrajectory: string;
  className?: string;
}

const AcademicProgressBar: React.FC<AcademicProgressBarProps> = ({ 
  academicTrajectory, 
  className 
}) => {
  const [activeBlockIndex, setActiveBlockIndex] = useState<number>(0);

  // Parse the academic trajectory to extract year blocks and content
  const parseTrajectory = (trajectory: string): AcademicBlock[] => {
    console.log('Parsing trajectory:', trajectory);
    
    // Split by common separators like arrows, bullets, or line breaks
    const segments = trajectory.split(/→|➤|->|\n•|\n-|\n\d+\./).map(s => s.trim()).filter(s => s.length > 0);
    console.log('Segments found:', segments);
    
    const blocks: AcademicBlock[] = [];
    
    // Try to identify patterns for different segments
    segments.forEach((segment, index) => {
      console.log(`Processing segment ${index}:`, segment);
      
      // Look for explicit year patterns
      const yearPatterns = [
        /año[s]?\s*(\d+)[–\-]?(\d+)?/i,
        /(\d+)[°º]?\s*año/i,
        /(primer|segundo|tercer|cuarto|quinto|sexto|séptimo)\s*año/i,
        /(postgrado|especialización|maestría|doctorado)/i,
        /(internado|serums|residencia)/i
      ];
      
      let matched = false;
      
      for (const pattern of yearPatterns) {
        const match = segment.match(pattern);
        if (match) {
          console.log('Pattern matched:', match);
          
          let range = '';
          let name = '';
          let content = segment;
          
          if (match[1] && match[2]) {
            // Range like "1-3" or "4-5"
            range = `Años ${match[1]}–${match[2]}`;
          } else if (match[1] && /^\d+$/.test(match[1])) {
            // Single year like "6"
            range = `Año ${match[1]}`;
          } else if (match[1]) {
            // Text-based year or stage
            range = match[1].charAt(0).toUpperCase() + match[1].slice(1);
          }
          
          // Extract content after the year pattern
          content = segment.replace(pattern, '').replace(/^[:\-\s]+/, '').trim();
          
          // Generate descriptive names based on common patterns
          if (segment.toLowerCase().includes('básic') || segment.toLowerCase().includes('fundament')) {
            name = 'Formación Básica';
          } else if (segment.toLowerCase().includes('clínic') || segment.toLowerCase().includes('rotaci')) {
            name = 'Rotaciones Clínicas';
          } else if (segment.toLowerCase().includes('internado')) {
            name = 'Internado';
          } else if (segment.toLowerCase().includes('serums')) {
            name = 'SERUMS';
          } else if (segment.toLowerCase().includes('postgrado') || segment.toLowerCase().includes('especializ')) {
            name = 'Especialización';
          } else if (segment.toLowerCase().includes('práctic')) {
            name = 'Práctica Profesional';
          } else {
            name = `Etapa ${index + 1}`;
          }
          
          blocks.push({
            range: range || `Etapa ${index + 1}`,
            name: name,
            description: content.length > 60 ? content.substring(0, 60) + '...' : content,
            content: content || segment
          });
          
          matched = true;
          break;
        }
      }
      
      // If no pattern matched, create a generic block
      if (!matched && segment.length > 20) {
        blocks.push({
          range: `Etapa ${index + 1}`,
          name: 'Formación',
          description: segment.length > 60 ? segment.substring(0, 60) + '...' : segment,
          content: segment
        });
      }
    });

    console.log('Final blocks:', blocks);

    // If no blocks were created or only one block, create a structured default
    if (blocks.length <= 1) {
      // Try to split by common academic progression indicators
      const progressionSplit = trajectory.split(/(?=año[s]?\s*\d+)|(?=postgrado)|(?=especialización)|(?=internado)|(?=serums)/i);
      
      if (progressionSplit.length > 1) {
        return progressionSplit.map((part, index) => {
          const cleanPart = part.trim();
          if (cleanPart.length === 0) return null;
          
          let range = `Etapa ${index + 1}`;
          let name = 'Formación';
          
          if (cleanPart.toLowerCase().includes('año')) {
            const yearMatch = cleanPart.match(/año[s]?\s*(\d+)/i);
            if (yearMatch) {
              range = `Año ${yearMatch[1]}`;
            }
          }
          
          if (index === 0) {
            range = 'Años 1–3';
            name = 'Formación Básica';
          } else if (index === 1) {
            range = 'Años 4–5';
            name = 'Especialización';
          } else if (index === 2) {
            range = 'Año 6';
            name = 'Práctica';
          }
          
          return {
            range,
            name,
            description: cleanPart.length > 60 ? cleanPart.substring(0, 60) + '...' : cleanPart,
            content: cleanPart
          };
        }).filter(Boolean) as AcademicBlock[];
      }
      
      // Final fallback: create structured blocks from the full text
      const parts = trajectory.split(/[.!?]/).filter(part => part.trim().length > 30);
      
      if (parts.length >= 2) {
        return parts.slice(0, 4).map((part, index) => ({
          range: index === 0 ? 'Años 1–3' : 
                 index === 1 ? 'Años 4–5' : 
                 index === 2 ? 'Año 6' : 'Postgrado',
          name: index === 0 ? 'Formación Básica' : 
                index === 1 ? 'Especialización' : 
                index === 2 ? 'Práctica' : 'Postgrado',
          description: part.trim().substring(0, 60) + '...',
          content: part.trim()
        }));
      }
      
      // Ultimate fallback
      return [
        {
          range: 'Años 1–3',
          name: 'Formación Básica',
          description: 'Fundamentos teóricos y bases de la carrera',
          content: trajectory.substring(0, Math.floor(trajectory.length / 2))
        },
        {
          range: 'Años 4–6',
          name: 'Especialización',
          description: 'Aplicación práctica y especialización',
          content: trajectory.substring(Math.floor(trajectory.length / 2))
        }
      ];
    }

    return blocks;
  };

  const blocks = parseTrajectory(academicTrajectory);
  const activeBlock = blocks[activeBlockIndex] || blocks[0];

  console.log('Active block index:', activeBlockIndex);
  console.log('Active block:', activeBlock);
  console.log('Total blocks:', blocks.length);

  const navigateToBlock = (index: number) => {
    console.log('Navigating to block:', index);
    if (index >= 0 && index < blocks.length) {
      setActiveBlockIndex(index);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="w-6 h-6 text-blue-600" />
        <div>
          <span className="text-lg font-semibold text-blue-700">Trayectoria por Bloques</span>
          <p className="text-sm text-gray-600 mt-1">Haz clic en un bloque de años para ver qué cursos y actividades se llevan</p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToBlock(activeBlockIndex - 1)}
          disabled={activeBlockIndex === 0}
          className="h-10 w-10 rounded-full border-blue-300 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        {/* Block Buttons */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-3 min-w-max px-2">
            {blocks.map((block, index) => (
              <Button
                key={index}
                variant={activeBlockIndex === index ? "default" : "outline"}
                size="lg"
                onClick={() => {
                  console.log('Button clicked, setting active block to:', index);
                  setActiveBlockIndex(index);
                }}
                className={cn(
                  "flex flex-col items-center gap-1 px-6 py-4 h-auto min-w-[140px] transition-all duration-300 whitespace-nowrap",
                  activeBlockIndex === index 
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg scale-105" 
                    : "border-blue-300 text-blue-600 hover:border-blue-500 hover:bg-blue-50"
                )}
              >
                <span className="text-sm font-bold">
                  {block.range}
                </span>
                <span className="text-xs text-center leading-tight opacity-90">
                  {block.name}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToBlock(activeBlockIndex + 1)}
          disabled={activeBlockIndex === blocks.length - 1}
          className="h-10 w-10 rounded-full border-blue-300 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Content Display Area - Only show selected block content */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 min-h-[180px] transition-all duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
            {activeBlockIndex + 1}
          </div>
          <div>
            <h4 className="text-xl font-bold text-blue-800">{activeBlock.range}: {activeBlock.name}</h4>
            <p className="text-sm text-blue-600">Bloque {activeBlockIndex + 1} de {blocks.length}</p>
          </div>
        </div>
        
        <div className="bg-white/70 rounded-xl p-5 backdrop-blur-sm border border-white/50">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 leading-relaxed">
                {activeBlock.content}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 flex justify-center">
          <div className="flex gap-2">
            {blocks.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                  index === activeBlockIndex ? "bg-blue-600 scale-125" : "bg-blue-300"
                )}
                onClick={() => setActiveBlockIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicProgressBar;
